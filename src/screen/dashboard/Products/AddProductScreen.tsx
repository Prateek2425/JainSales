
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import AtomView from '../../../components/atoms/AtomView';
import AtomText from '../../../components/atoms/AtomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import AtomStatusBar from '../../../components/atoms/AtomStatusBar';
import { Theme } from '../../../theme/constants';
import { getCategory, getProducts, productByVendor } from '../dashboardThunk';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { goBack } from '../../../Navigation/RootNavigation';
import AtomButton from '../../../components/atoms/AtomButton';

const AddProductScreen = () => {
  const { token } = useAppSelector(state => state.auth);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQantity] = useState('');
  const [description, setDescription] = useState('');
  const [categoryValue, setCategoryValue] = useState<any | undefined>({});
  const [image, setImage] = useState<Asset | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [CategoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    getCategoryHandler()
    return () => { }
  }, [])

  const getCategoryHandler = async () => {
    try {
      const response = await dispatch(getCategory()).unwrap();
      if (response?.status === 200) {
        setCategoryData(response?.data?.data)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result.didCancel) return;

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Unable to select image');
      return;
    }

    const selectedImage = result.assets?.[0];

    if (selectedImage) {
      if (selectedImage.fileSize && selectedImage.fileSize > 5 * 1024 * 1024) {
        Alert.alert('Image too large', 'Please select an image under 5MB.');
        return;
      }

      setImage(selectedImage);
    }
  };

  const handleSubmit = async () => {
    if (!image?.uri || !productName.trim() || !price.trim() || !quantity.trim() ||
      !description.trim() || !categoryValue) {
      Alert.alert('Required Fields', 'Please fill all fields and upload an image.');
      return;
    }
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", categoryValue?._id)
      formData.append("description", description);
      formData.append("image", {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || 'product.jpg',
      });
      const data = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type manually mat set karo
        },
        body: formData,
      });
      const response = await data.json();
      if (response?.data) {
        await dispatch(productByVendor()).unwrap()
        await dispatch(getProducts()).unwrap()
        goBack()
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    goBack()
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDBE050" }}>
      <AtomStatusBar />
      <AtomView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <AtomView style={styles.card}>
            <AtomText
              title="Add Product Information"
              fontSize={18}
              fontWeight="700"
              color="#202A40"
            />
            <AtomText title="Product Image *" style={styles.label} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.uploadBox}
              onPress={pickImage}
            >
              {image?.uri ? (
                <Image
                  source={{ uri: image.uri }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              ) : (
                <AtomView style={styles.uploadContent}>
                  <AtomView style={styles.uploadIcon}>
                    <AtomText title="↑" fontSize={30} color="#665BE5" />
                  </AtomView>

                  <AtomText
                    title="Upload Product Image"
                    fontSize={15}
                    fontWeight="700"
                    color="#303B52"
                  />

                  <AtomText
                    title="Tap here to select image"
                    fontSize={12}
                    color="#8992A3"
                    style={{ marginTop: 7 }}
                  />

                  <AtomText
                    title="PNG, JPG or WEBP (Max 5MB)"
                    fontSize={11}
                    color="#A0A8B6"
                    style={{ marginTop: 5 }}
                  />
                </AtomView>
              )}
            </TouchableOpacity>

            {image?.uri && (
              <TouchableOpacity onPress={pickImage}>
                <AtomText
                  title="Change Image"
                  color="#665BE5"
                  fontSize={13}
                  fontWeight="600"
                  style={styles.changeImage}
                />
              </TouchableOpacity>
            )}

            {/* Product Name */}
            <AtomText title="Product Name *" style={styles.label} />

            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              placeholderTextColor="#A0A8B6"
              value={productName}
              onChangeText={setProductName}
            />

            {/* quantity */}

            <AtomText title="quantity *" style={styles.label} />

            <AtomView style={styles.priceContainer}>
              <AtomText
                title="₹"
                fontSize={17}
                fontWeight="600"
                color="#667085"
              />

              <TextInput
                style={styles.priceInput}
                placeholder="Enter product quantity"
                placeholderTextColor="#A0A8B6"
                keyboardType="decimal-pad"
                value={quantity}
                onChangeText={setQantity}
              />
            </AtomView>

            {/* Price */}
            <AtomText title="Price (₹) *" style={styles.label} />

            <AtomView style={styles.priceContainer}>
              <AtomText
                title="₹"
                fontSize={17}
                fontWeight="600"
                color="#667085"
              />

              <TextInput
                style={styles.priceInput}
                placeholder="Enter product price"
                placeholderTextColor="#A0A8B6"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
            </AtomView>

            {/* Category */}
            <AtomText title="Category *" style={styles.label} />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dropdown}
              onPress={() => setShowCategories(true)}
            >
              <AtomText
                title={categoryValue?.name || 'Select product category'}
                fontSize={14}
                color={categoryValue?.color ? '#293449' : '#A0A8B6'}
              />

              <AtomText title="⌄" fontSize={22} color="#667085" />
            </TouchableOpacity>

            {/* Description */}
            <AtomText title="Description *" style={styles.label} />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Write something about your product..."
              placeholderTextColor="#A0A8B6"
              multiline
              textAlignVertical="top"
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
            />

            {/* Buttons */}
            <AtomView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleReset}
              >
                <AtomText
                  title="Cancel"
                  color="#667085"
                  fontWeight="600"
                  fontSize={14}
                />
              </TouchableOpacity>
              <AtomButton
                disabled={loading}
                title='+ Add Product'
                onPress={handleSubmit}
                style={styles.submitButton}
              />
            </AtomView>
          </AtomView>
        </ScrollView>

        {/* Category Modal */}
        <Modal
          visible={showCategories}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCategories(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowCategories(false)}
          >
            <AtomView style={styles.modalContent}>
              <AtomText
                title="Select Category"
                fontSize={18}
                fontWeight="700"
                color="#202A40"
                style={styles.modalTitle}
              />

              {CategoryData.map((item: any) => (
                <TouchableOpacity
                  key={item?._id}
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategoryValue(item);
                    setShowCategories(false);
                  }}
                >
                  <AtomText
                    title={item?.name}
                    fontSize={15}
                    color="#344054"
                  />

                  {categoryValue?.name === item?.name && (
                    <AtomText
                      title="✓"
                      color="#665BE5"
                      fontSize={18}
                      fontWeight="700"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </AtomView>
          </TouchableOpacity>
        </Modal>
      </AtomView>
    </SafeAreaView>
  );
};

export default AddProductScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.secondary,
  },

  scrollContent: {
    padding: 16,
  },

  header: {
    marginBottom: 22,
    marginTop: 10,
  },

  subtitle: {
    marginTop: 7,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDF0F5',
  },

  helperText: {
    marginTop: 6,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344054',
    marginBottom: 10,
    marginTop: 19,
  },

  uploadBox: {
    height: 190,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D5D5EA',
    borderRadius: 12,
    backgroundColor: '#FAFAFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadIcon: {
    height: 45,
    width: 45,
    borderRadius: 12,
    backgroundColor: '#ECEAFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  changeImage: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E6EE',
    borderRadius: 9,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#293449',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Lato-Regular',
  },

  priceContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E6EE',
    borderRadius: 9,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  priceInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 14,
    color: '#293449',
    fontFamily: 'Lato-Regular',
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E6EE',
    borderRadius: 9,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  descriptionInput: {
    height: 120,
    paddingTop: 14,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#EDF0F5',
    gap: 10,
  },

  cancelButton: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E1E5ED',
    alignItems: 'center',
    justifyContent: 'center',
    width: "48%"
  },

  submitButton: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 9,
    backgroundColor: '#665BE5',
    alignItems: 'center',
    justifyContent: 'center',
    width: "48%"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 25,
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    marginBottom: 15,
  },

  categoryItem: {
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});



import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import { navigate } from '../../../Navigation/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../../theme/constants';
import Header from '../../../components/CustomComponents/Header';
import AtomView from '../../../components/atoms/AtomView';
import { useDispatch } from 'react-redux';
import { addReview } from '../dashboardThunk';

const OrderSuccessReview = ({ route }: any) => {
    const { orderData } = route?.params
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmitReview = async () => {
        // const data = {
        //     "productId": orderData?.products?.[0]?._id,
        //     "orderId": orderData?._id,
        //     "rating": rating,
        //     "description": review
        // }
        // // console.log("data", data)
        // try {
        //     setLoading(true)
        //     let response = await dispatch(addReview(data))?.unwrap()
        //     console.log("response", response)
        // } catch (error) {
        //     console.log("error", error)
        // } finally {
        //     setLoading(false)
        // }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background.secondary }}>
            <Header back title='OrderPlaced' />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Success Section */}

                <AtomView style={styles.successContainer}>
                    <AtomView style={styles.successIcon}>
                        <Text style={styles.checkIcon}>✓</Text>
                    </AtomView>

                    <Text style={styles.successTitle}>
                        Order Successfully Placed!
                    </Text>

                    <Text style={styles.successDescription}>
                        Thank you for your purchase. Your order has been
                        placed successfully.
                    </Text>
                </AtomView>

                {/* Order Details */}

                <AtomView style={styles.orderCard}>
                    <Text style={styles.cardTitle}>Order Details</Text>

                    <AtomView style={styles.detailRow}>
                        <Text style={styles.label}>Order ID</Text>
                        <Text style={styles.value}>{orderData?.orderId}</Text>
                    </AtomView>

                    <AtomView style={styles.detailRow}>
                        <Text style={styles.label}>Payment Status</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </AtomView>

                    <AtomView style={styles.detailRow}>
                        <Text style={styles.label}>Order Status</Text>
                        <Text style={styles.statusText}>Confirmed</Text>
                    </AtomView>

                    <AtomView style={styles.divider} />

                    <AtomView style={styles.detailRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>
                            {/* ₹{totalAmount.toLocaleString('en-IN')} */}
                        </Text>
                    </AtomView>
                </AtomView>

                {/* Review Section */}

                <AtomView style={styles.reviewCard}>
                    <Text style={styles.reviewTitle}>
                        How was your experience?
                    </Text>

                    <Text style={styles.reviewSubtitle}>
                        Share your experience with us.
                    </Text>

                    <Text style={styles.ratingLabel}>Rate your experience</Text>

                    <AtomView style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setRating(star)}
                            >
                                <Text
                                    style={[
                                        styles.star,
                                        {
                                            color: star <= rating ? '#F5A623' : '#D5D5D5',
                                        },
                                    ]}
                                >
                                    ★
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </AtomView>

                    <Text style={styles.ratingText}>
                        {rating === 0
                            ? 'Select your rating'
                            : rating === 5
                                ? 'Excellent!'
                                : rating === 4
                                    ? 'Very Good!'
                                    : rating === 3
                                        ? 'Good'
                                        : rating === 2
                                            ? 'Fair'
                                            : 'Poor'}
                    </Text>

                    <Text style={styles.inputLabel}>Write your review</Text>

                    <TextInput
                        style={styles.reviewInput}
                        placeholder="Tell us about your experience..."
                        placeholderTextColor="#999"
                        multiline
                        textAlignVertical="top"
                        value={review}
                        onChangeText={setReview}
                        maxLength={500}
                    />

                    <Text style={styles.characterCount}>
                        {review.length}/500
                    </Text>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmitReview}
                    >
                        <Text style={styles.submitButtonText}>
                            Submit Review
                        </Text>
                    </TouchableOpacity>
                </AtomView>

                {/* Continue Shopping */}

                <TouchableOpacity
                    style={styles.shoppingButton}
                    onPress={() => navigate("DrawerNavigator")}
                >
                    <Text style={styles.shoppingButtonText}>
                        Continue Shopping →
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderSuccessReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    content: {
        padding: 16,
    },
    successContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    successIcon: {
        width: 85,
        height: 85,
        borderRadius: 50,
        backgroundColor: '#E2F8EC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: 48,
        color: '#20A464',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 23,
        fontWeight: '700',
        color: '#202020',
        marginTop: 20,
        textAlign: 'center',
    },
    successDescription: {
        fontSize: 14,
        color: '#858585',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 16,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    label: {
        fontSize: 14,
        color: '#888',
    },
    value: {
        fontSize: 14,
        color: '#222',
        fontWeight: '600',
    },
    paidText: {
        color: '#20A464',
        fontWeight: '600',
    },
    statusText: {
        color: '#2476D2',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: 12,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#20A464',
    },
    reviewCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
    },
    reviewTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#222',
    },
    reviewSubtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 7,
    },
    ratingLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 22,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        gap: 12,
    },
    star: {
        fontSize: 38,
    },
    ratingText: {
        textAlign: 'center',
        color: '#F0A020',
        fontWeight: '600',
        marginTop: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 22,
        marginBottom: 10,
    },
    reviewInput: {
        height: 120,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        padding: 13,
        fontSize: 14,
        color: '#222',
        backgroundColor: '#FAFAFA',
    },
    characterCount: {
        textAlign: 'right',
        color: '#999',
        fontSize: 11,
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: '#202020',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 15,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    shoppingButton: {
        borderWidth: 1,
        borderColor: '#202020',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    shoppingButtonText: {
        color: '#202020',
        fontSize: 15,
        fontWeight: '700',
    },
});

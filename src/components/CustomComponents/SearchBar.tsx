import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../theme/constants';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFilterPress?: () => void;
    onVoicePress?: () => void;
}

const SearchBar = ({
    value,
    onChangeText,
    placeholder = 'Search products...',
    onFilterPress,
    onVoicePress,
}: SearchBarProps) => {
    return (
        <View style={styles.container}>
            {/* Search Box */}
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search-outline"
                    size={20}
                    color="#111"
                />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    style={styles.input}
                    returnKeyType="search"
                />
                {/* <TouchableOpacity onPress={onVoicePress}>
                    <Ionicons
                        name="mic-outline"
                        size={22}
                        color="#777"
                    />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={onFilterPress}
                >
                    <Ionicons
                        name="options-outline"
                        size={24}
                        color="#111"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        height: 48,
        backgroundColor: '#F5F5F5',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Theme.colors.common.borderColor,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 14,
        color: '#222',
    },
    filterButton: {
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
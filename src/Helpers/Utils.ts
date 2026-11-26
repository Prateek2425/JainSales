
import { Alert } from "react-native";

// Simple OK Alert
export const showAlert = (
  title = "Success",
  message = "Operation completed successfully"
) => {
  Alert.alert(title, message, [
    {
      text: "OK",
      onPress: () => console.log("OK Pressed"),
    },
  ]);
};

type ConfirmAlertProps = {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const showConfirmAlert = ({
  title = "Confirmation",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}: ConfirmAlertProps) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      style: "cancel",
      onPress: onCancel,
    },
    {
      text: "OK",
      onPress: onConfirm,
    },
  ]);
};

// Delete Confirmation Alert
export const showDeleteAlert = (onDelete: any) => {
  Alert.alert(
    "Delete",
    "Are you sure you want to delete this item?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]
  );
};

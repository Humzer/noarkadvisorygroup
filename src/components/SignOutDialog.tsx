import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SignOutDialogProps {
  onConfirm: () => void;
  children: React.ReactNode;
}

const SignOutDialog = ({ onConfirm, children }: SignOutDialogProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="font-serif">Sign out?</AlertDialogTitle>
        <AlertDialogDescription className="font-sans">
          Are you sure you want to sign out of your account?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="font-sans">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="font-sans">
          Sign Out
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default SignOutDialog;

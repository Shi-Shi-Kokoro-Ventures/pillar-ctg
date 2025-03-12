
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ResumeUpload from './ResumeUpload';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0">
        <ResumeUpload onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;

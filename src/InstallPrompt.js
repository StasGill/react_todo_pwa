// src/InstallPrompt.js

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const InstallPrompt = ({ open, onClose, onInstall }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Install App"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to install this app on your device?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onInstall} color="primary" autoFocus>
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstallPrompt;

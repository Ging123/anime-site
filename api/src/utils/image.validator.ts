class ImageValidator {

  public isImage(imageName:string, mimeType:string) {
    const extention = imageName.split(".")[1];
    const extentionIsValid = this.validateExtention(extention);
    const mimeTypeIsValid = this.validateMimeType(mimeType);
    return extentionIsValid && mimeTypeIsValid;
  }

  private validateExtention(extention:string) {
    const allowedExts = ["jpeg", "jpg", "png", "svg"];
    for(const validExt of allowedExts) {
      if(extention === validExt) return true;
    }
    return false;
  }

  private validateMimeType(mimeType:String) {
    const allowedMimeTypes = ["image/jpeg", "image/pjpeg", "image/x-png", 
    "image/png", "image/svg+xml"];

    for(const validMimeType of allowedMimeTypes) {
      if(mimeType === validMimeType) return true;
    }
    
    return false;
  }
}

export default ImageValidator;
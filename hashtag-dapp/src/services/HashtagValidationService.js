class HashtagValidationService {
  constructor(buefyToast) {
    this.buefyToast = buefyToast;
  }

  dangerToast(message) {
    this.buefyToast.open({
      duration: 5000,
      message,
      position: "is-top",
      type: "is-danger",
    });
  }

  validateTag(hashtag, hashtags) {
    const inputValue = hashtag && hashtag.name ? hashtag.name : hashtag;
    const machineName = inputValue.toLowerCase();
    // console.log("input inputValue", inputValue);
    // console.log("machineName", machineName);
    // console.log(hashtags);
    if (
      (hashtags || []).filter((option) => {
        return option.hashtagWithoutHash === machineName;
      }).length !== 0
    ) {
      this.dangerToast(
        `Sorry, but '#${inputValue}' already exists. Please try another.`
      );
      return false;
    }

    if (inputValue.includes("#")) {
      this.dangerToast(
        `The hashtag character ("#") is not permitted anywhere in your hashtag.`
      );
      return false;
    }

    if (inputValue.length < 3) {
      this.dangerToast(
        `Sorry, but '#${inputValue}' is an invalid tag as it's less than 3 characters long.`
      );
      return false;
    }

    if (inputValue.length > 32) {
      this.dangerToast(
        `Sorry, but '#${inputValue}' is an invalid tag as it's more than 15 characters long.`
      );
      return false;
    }

    if (!/^#*\d*[a-zA-Z][a-zA-Z0-9]*$/.test(inputValue)) {
      this.dangerToast(
        `Sorry, but '#${inputValue}' is an invalid tag as it's either not alpha numeric or only numeric.`
      );
      return false;
    }

    return true;
  }
}

export default HashtagValidationService;

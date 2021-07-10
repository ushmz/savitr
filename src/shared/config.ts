export const preTaskUrl: EnqueteURL = {
  controled: {
    shopping:
      'https://docs.google.com/forms/d/e/1FAIpQLSe8fcClPc1yIawtpnnaC5G5bf2sIn4OUNx9A-71Nvypu4ts1w/viewform?usp=sf_link',
    desease:
      'https://docs.google.com/forms/d/e/1FAIpQLSdNveC6ZdI9yiLeFvQVdCkVan3_iLVuvjKyt0sCOiFtmns_2w/viewform?usp=sf_link',
  },
  experienced: {
    shopping:
      'https://docs.google.com/forms/d/e/1FAIpQLSe8fcClPc1yIawtpnnaC5G5bf2sIn4OUNx9A-71Nvypu4ts1w/viewform?usp=sf_link',
    desease:
      'https://docs.google.com/forms/d/e/1FAIpQLSdNveC6ZdI9yiLeFvQVdCkVan3_iLVuvjKyt0sCOiFtmns_2w/viewform?usp=sf_link',
  },
};

export const postTaskUrl: EnqueteURL = {
  controled: {
    shopping:
      'https://docs.google.com/forms/d/e/1FAIpQLSfdSj1TZPhFT8MjPfmn5RGh6iJU_Juhb0h66nJ0zQq8Q2iwfQ/viewform?usp=sf_link',
    desease:
      'https://docs.google.com/forms/d/e/1FAIpQLScz0tXoh8y6kkMaKz7F7phnDz5dJORzSfN2PTxrlcY-IsUSgw/viewform?usp=sf_link',
  },
  experienced: {
    shopping:
      'https://docs.google.com/forms/d/e/1FAIpQLSegaT7fQkQYuXFGls5tmnsSRVgG-71iwVz0_eJeOZ7zht9kzQ/viewform?usp=sf_link',
    desease:
      'https://docs.google.com/forms/d/e/1FAIpQLSfF-fp--vhA-cI5xsP6msqjINmetwR3giN0YKourq_NJrBfRQ/viewform?usp=sf_link',
  },
};

type EnqueteURL = {
  controled: {
    shopping: string;
    desease: string;
  };
  experienced: {
    shopping: string;
    desease: string;
  };
};

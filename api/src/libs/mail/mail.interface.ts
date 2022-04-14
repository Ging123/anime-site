interface Mail {
  send:(emailData:email) => void;
}

export interface email {
  to:string;
  subject:string;
  html:string;
}

export default Mail;
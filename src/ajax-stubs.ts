import { AjaxRequestObject } from "./github/gtmsportswear/js-xhr@2.0.1/src/ajax";

let testTemplate = '<div>Color: {{color}}.</div>';

export function ajaxSuccess(req: AjaxRequestObject): Promise<any> {
  return new Promise((success, error) => {
    success(testTemplate); 
  });
}

export function ajaxResultNotFound(req: AjaxRequestObject): Promise<any> {
  return new Promise((success, error) => {
    error('There was a problem with the request: NOT FOUND');
  });
}

export function ajaxInvalidUrl(req: AjaxRequestObject): Promise<any> {
  return new Promise((success, error) => {
    error('Not a valid URL.');
  });
}

export function changeSuccessMessage(newMessage: string) {
  testTemplate = newMessage;
}

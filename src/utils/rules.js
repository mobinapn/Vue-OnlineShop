export function requiredRule (value) {
    return !!value || 'این فیلد الزامی است'
  }
  
  export function emailRule (value) {
    // eslint-disable-next-line
    return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'آدرس ایمیل وارد شده اشتباه است'
  }
  
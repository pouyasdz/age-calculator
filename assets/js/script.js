class App {
  inputControll = document.querySelectorAll(".input-group > *  input");
  placeHolders = document.querySelectorAll(".container > ul  span");

  errors = {
    empty: "This fields is required",
    invalid: "Must be a valid ",
    whole: "Must be a valid date",
  };

  addError(element, message) {
    element.classList.add("border-error");
    const parrent = element.parentElement.children;
    parrent[0].classList.add("text-error");
    parrent[2].innerHTML = message;
  }
  removeError(element) {
    element.classList.remove("border-error");
    const parrent = element.parentElement.children;
    parrent[0].classList.remove("text-error");
    parrent[2].innerHTML = null;
  }

  formValidator() {
    this.inputControll.forEach((input) => {
      if (!Number(input.value)) return this.addError(input, this.errors.whole);
      if (input.id == "day" && input.value > 31)
        return this.addError(input, this.errors.invalid + "day");
      if (input.id == "month" && input.value > 12)
        return this.addError(input, this.errors.invalid + "month");
      if (input.id == "year" && input.value < 1000)
        return this.addError(input, this.errors.invalid + "year");
    });
  }

  handleChange(e) {
    this.removeError(e);
    if (!Number(e.value)) return this.addError(e, this.errors.whole);
    if (e.id == "day" && e.value > 31)
      return this.addError(e, this.errors.invalid + "day");
    if (e.id == "month" && e.value > 12)
      return this.addError(e, this.errors.invalid + "month");
    if (e.id == "year" && e.value < 1000)
      return this.addError(e, this.errors.invalid + "year");
  }

  getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
  }

  submit(e) {
    this.formValidator();
    let [d1, m1, y1] = this.inputControll;
    d1 = d1.value;
    m1 = m1.value;
    y1 = y1.value;
    let today = new Date();
    let d2, m2, y2, d3, m3, y3;
    
    d2 = today.getDate();
    m2 = today.getMonth();
    y2 = today.getFullYear();
    y3 = y2 - y1 ;

    if(m2 >= m1){ m3 = m2 - m1 ;}
    else{
      y3--;
      m3=12 + m2 - m1;
  
    }
    if(d2 >= d1){ d3 = d2 - d1;}
    else{
      m3--;
      d3 = this.getDaysInMonth(y1, m1) + d2 - d1;
    }

    if(m3 < 0){
      m3 = 11;
      y3 --;
    }
    
    this.placeHolders[0].innerHTML = y3;
    this.placeHolders[1].innerHTML = m3;
    this.placeHolders[2].innerHTML = d3;
  }
}

const app = new App();



const validation = (val, rules, form)=>{
        let valid = true
        for(let rule in rules){
            switch(rule){
                case 'require':
                    valid = valid && isRequire(val)
                    break
                case 'minChar':
                    valid = valid && usernameLength(val, rules[rule])
                    console.log(rules[rule])
                    break          
                case 'isEmail':
                    valid = valid && verifyEmail(val)
                break
                case 'minLength':
                    valid = valid && passwordValidation(val, rules[rule])
                break
                case 'confirmpass':
                    valid = valid && confirmPassword(val, form.password.value)
                break
             default:
            valid
           } 
        }
        
        return valid
        
}
const isRequire = (val)=>{
    if(val === ''){
        return false
    }else{
        return true
    }   
}
const verifyEmail = (val)=>{
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    .test(val.toLowerCase())
}
const usernameLength = (val, checkLength)=>{
    if(val.length >= checkLength) {
      return true 
    }else{
        return false
    }
}
const passwordValidation = (val, checkLength)=>{
    if(val.length >= checkLength) {
      return true 
    }else{
        return false
    }
}
const confirmPassword = (val, confirmPass)=>{
    return val === confirmPass
}
export default validation
 
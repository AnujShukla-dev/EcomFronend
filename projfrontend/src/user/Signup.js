import React, { useState } from "react";
import { browserHistory } from 'react-router';
import Base from "../core/Base";
import { Link ,Redirect } from "react-router-dom";
import { signup } from "../auth/helper";
import { CardContent, Card,Button,Input ,Backdrop,CircularProgress,Snackbar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import "../CustomCSS/Auth.css";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "black",
    backgroundColor: "#A3A4BE",
  },
}));

const Signup = ({history}) => {
  const classes = useStyles();
    const [values,setValues] = useState({
        name:"",
        email:"",
        password: "",
        error:"",
        success:false
    })
    const [backDrop,setBackDrop] = useState(false);
    const {name,email,password,error,success} = values;
    console.log(success)
    console.log(values);
    const handleChange = name => event=>{
            setValues({...values,error:false,[name]:event.target.value})
           
    }
    const loader = <Backdrop className={classes.backdrop} open={backDrop}>
    <CircularProgress color="inherit" />
  </Backdrop>

     const onSumbit = event =>{
      
        setValues({...values,error:false})
        setBackDrop(true);
        signup({name,email,password})
        .then(data=>{
            if(!data.success){
            console.log('error');
                setValues({...values,error:data.error.message,success:false})
            }
            else{
                setValues({...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:true});
                setTimeout(()=>{ history.push("/signin");},1000)
               
            }
            
        })
        .catch(error=>{setValues({...values,errors:(!error.message)?error.message:'some thing went wrong'})
          console.log(error);
      })
        setBackDrop(false);
    }
    const successMessage=()=>{
      let vertical ='bottom' ;
      let  horizontal = 'center';
       return(
        <Snackbar
        autoHideDuration={6000}
        severity="success"
        anchorOrigin={{ vertical, horizontal }}
        open={success}
        key={vertical + horizontal}
      >
        <Alert  onClose={()=>{setValues({...values,success :''})}} severity="success">
        {"Account Created Successfully"}
  </Alert>
      </Snackbar> )
    }
    const errorMessage =()=>{
      let vertical ='bottom' ;
      let  horizontal = 'center';
       return(
        <Snackbar
        autoHideDuration={6000}
        severity="error"
        anchorOrigin={{ vertical, horizontal }}
        open={error}
        key={vertical + horizontal}
      >
        <Alert  onClose={()=>{setValues({...values,error :''})}} severity="error">
        {error}
  </Alert>
      </Snackbar> );
    }
    const frontValidation =(event)=>{
      event.preventDefault();
      if(name && email && password){
          onSumbit()
            
      }
      else{
        setValues({...values,error:'please fill the required fields'})
      }
      

    }

  const signUpForm = () => {
    console.log(backDrop)
    return (
      
      (backDrop)?loader:<div className="app__auth">
        <Card className="app__card">
          <CardContent>
              <label >Name</label>
              <Input 
              required
                fullWidth="true"
                type="text" 
                onChange={handleChange("name")} 
                value = {name}
               />
               </CardContent>
           <CardContent>
              <label >Email</label>
              <Input 
                fullWidth="true"
                type="email"  
                value={email}
                onChange={handleChange("email")} 
                
                />
            </CardContent>
            <CardContent>

          
              <label >Password</label>
              <Input 
                fullWidth="true"
                type="password" 
                value={password}
                onChange={handleChange("password")} 
                />
          </CardContent>
          <CardContent>
            <Button  className={classes.button} onClick ={frontValidation}
                >
                    Submit</Button>
                    </CardContent>
         </Card>
        </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
        {successMessage()}
        {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
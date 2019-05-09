import React, { Component } from 'react';
import Particles from 'react-particles-js';
import clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin.js';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImagelinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import './App.css';

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: <your api here>>
});

const particlesOptions={
 particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
  }
}
 } 

class App extends Component {
  constructor()
  {
    super();
    this.state=
    {
      input:'',
      imgURL:'',
      box:{},
      route: 'signin',
      isSigned: false,
      user:{
          id:'',
          name:'',
          email: '',
          password:'',
          Joined: ''
          }
    }
  }

loadUser=(data)=>
{
    this.setState(
      {
      user: 
      {
        id: data.id,
        name: data.name,
        email: data.email,
        Joined:data.Joined
      }
    })
}


calculateFaceLocation=(data)=>
{
    const clarifiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const img= document.getElementById('inputimage');
    const width= Number(img.width);
    const height= Number(img.height);
    console.log(width,height);
    return{
      leftcol: clarifiFace.left_col * width,
      toprow: clarifiFace.top_row *height,
      bottomrow:height-(clarifiFace.bottom_row * height),
      rightcol: width-(clarifiFace.right_col *width),
    }

}
onRouteChange=(route)=>
{

  if(route==='signout')
  {
    this.setState({isSigned: false})
  } 
  else if (route==='home')
  {
    this.setState({isSigned:true})
  }

 this.setState({route:route});
}

displayFaceBox=(box)=>{
  console.log(box);
  this.setState({box:box});
}
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

onButtonClick=()=>{
  this.setState({imgURL:this.state.input})
  app.models.predict(
    clarifai.FACE_DETECT_MODEL, 
    this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err=>console.log(err));
      // there was an error
 }

  render() 
  {
    return (
      <div className="App">
      <Particles className='particles' params={particlesOptions}/>
       <Navigation isSigned={this.state.isSigned} onRouteChange={this.onRouteChange} />
       {
        (this.state.route==='home')?
         <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
            <FaceRecognition imgURL={this.state.imgURL} box={this.state.box} />
          </div>
          :(
          (this.state.route==='signin')?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
      )}
      
}

export default App;



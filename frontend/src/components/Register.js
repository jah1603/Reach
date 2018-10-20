import React, { Component } from "react";
import axios from 'axios';
import PasswordMask from 'react-password-mask';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';




class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image_count: [1],
        upload_status: {
          photo1: 'foto-upload',
          photo2: 'foto-upload',
          photo3: 'foto-upload',
          photo4: 'foto-upload',
          photo5: 'foto-upload',
          photo6: 'foto-upload'
        },
        username: '',
        password: '',
        login: false,
        signUpSubmit: false,
        data: {},
        activation_token: '',
        activation_user: null,
        activation_user_password: '',
        password: '',
          name: 'test',
          looking_for: 'Any',
          location: '',
          date_of_birth: '',
          gender: 0,
          description: '',
          interests: '',
          twitter_handle: '',
          facebook_handle: '',
          instagram_handle: '',
          youtube_handle: '',
          spotify_handle: '',
          snapchat: '',
          additional_info: '',
          image1:'',
          image2:'',
          image3:'',
          image4:'',
          image5:'',
          image6:'',
          photo1: '',
          photo2: '',
          photo3: '',
          photo4: '',
          photo5: '',
          photo6: ''


        }
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);


      };





    handleSubmit(evt){
      console.log(this.state);
      var self = this;
      evt.preventDefault();
      console.log("pw", this.state.activation_user_password);
      console.log("username",self.state.activation_user['username']);
      var session_url = 'http://localhost:8080/social_reach/api/auth/token/obtain/';
      console.log(self.state.password);
// poST request currently meaningless as no JWT is needed to make profile currently
      axios.post(session_url, {
          'username': self.state.activation_user['username'],
          'password': self.state.password
        }).then(function(response) {
          console.log(response);
        console.log('Authenticated');
        var token = response.data['access']
      var user = self.state.activation_user['id']
      var name = self.state.name
      var bio = self.state.description
      var looking_for = self.state.looking_for
      console.log(looking_for);
      var location = self.state.location
      var date_of_birth = self.state.date_of_birth
      var gender = self.state.gender
      var twitter_handle = self.state.twitter_handle
      var instagram_handle = self.state.instagram_handle
      var youtube_handle = self.state.youtube_handle
      var picture_one = self.state.photo1
      var picture_two = self.state.photo2
      var picture_three = self.state.photo3
      var picture_four = self.state.photo4
      var picture_five = self.state.photo5
      var picture_six = self.state.photo6
      console.log(picture_one);
      var create_profile_url = 'http://localhost:8080/social_reach/profiles/'

      const formData = new FormData();
      formData.append('picture', picture_one);
      formData.append('picture_two', picture_two);
      formData.append('picture_three', picture_three);
      formData.append('picture_four', picture_four);
      formData.append('picture_five', picture_five);
      formData.append('picture_six', picture_six);
      formData.append('name', name);
      formData.append('user', user);
      formData.append('bio', bio);
      formData.append('looking_for', looking_for);
      formData.append('location', location);
      formData.append('date_of_birth', date_of_birth);
      formData.append('gender_identity', gender);
      formData.append('twitter_handle', twitter_handle);
      formData.append('instagram_handle', instagram_handle);
      formData.append('youtube_handle', youtube_handle);
      axios.post(create_profile_url, formData).then(()=>{
        console.log("Done");
        self.props.handleLoginFromRegistrationSubmit( self.state.activation_user['username'],self.state.password)
        })
      }).catch(function(e){
        console.log(e);
      })
    }


    handleChange(evt){


       this.setState({
         [evt.target.name]: evt.target.value
       })

    }

    fileChangedHandler(event){
      let photo = event.target.name
      let image = event.target.id
      let reader = new FileReader()
      reader.onloadend = () => {
        this.setState({
          [image]: reader.result
          })
         }
    if (event.target.files[0] != undefined ){
      reader.readAsDataURL(event.target.files[0])
      if (this.state.image_count.length < 6){
      this.setState(prevState => ({ image_count: [...prevState.image_count, prevState.image_count.length+1]}))
    }}
    this.setState(prevState => ({
    upload_status: {
        ...prevState.upload_status,
        [photo]: 'foto-upload-ready'
    }
    }))
    this.setState({
      [event.target.name]: event.target.files[0],
        })


}





    componentDidMount(){
          console.log(this.props.data.history);

      // needs updated to include the correct activation components
      var self = this;
      var uid = this.props.data.match.params.id
      console.log(uid);
      var token = this.props.data.match.params.token

      console.log(token);
      var activation_url = `http://localhost:8080/social_reach/auth/users/confirmation/${uid}/${token}`
       axios.get(`${activation_url}/?format=json`).then(function (response) {
            self.setState({
              activation_user: response.data.user
            })

        }).catch(function (error) {
                console.log(error);
        });
        console.log(this.props);
         }



    render(){



      var photoUpload =  this.state.image_count.map(index => {
        let name = "photo" + index
        let id = "image" + index
        return (
          <fieldset>
            <legend><span class="number"></span>Photos</legend>
            <input type="file" onChange={this.fileChangedHandler} name={name} id={id} class={this.state.upload_status[`${name}`]} ></input>
            <img src={this.state[id]} />
          </fieldset>

        )
      })



      var inputStyles = {

        width: '100%',
        marginBottom: 'none'
        // fontSize: '0.8em'
      };

      var buttonStyles = {

       top: '50%',
       right: '0.1em',
       marginTop: '-13px',
       padding: '4px ',
       background: 'rgb(43, 187, 173)',
       borderRadius: '2px',
       color: 'rgb(255, 255, 255)',
       textAlign: 'center',
       textDecoration: 'none',
       textTransform: 'uppercase',
       userSelect: 'none',
       display: 'inline',
       fontSize: '0.7em'
      }


       if (this.props.info.user){
        return <Redirect to='/profile' data={this.state} loggedInAs={this.state.username} login= {true}/>
      }

      if (this.state.activation_user){
      return (
        <div className="register">

        <h6 align="center" style={{fontWeight: 'bold'}}>Welcome to &copy;Reach, {this.state.activation_user['username']}! {"Let's start by making your profile."}</h6>
<p></p>

      {/* PROFILE INFO INPUT FORM START */}
      <div class="user-input-form">
        <form onSubmit={this.handleSubmit}>

      {/* BASIC INFO SECTION */}
      <fieldset>
            <legend><span class="number"></span> Basic Info</legend>
            <PasswordMask id="password" name="password" placeholder="Enter password" value={this.state.password}
 onChange={this.handleChange} useVendorStyles={true} buttonStyles={buttonStyles} inputStyles={inputStyles}
/>

            <input onChange={this.handleChange} type="text" name="name" placeholder="Your Name *"></input>
            <p>Looking for:</p>
            <select onChange={this.handleChange} name="looking_for">
              <option value="Girls">Girls</option>
              <option value="Guys">Guys</option>
              <option value="Any">Any</option>
            </select>


            {/* LOCATION INPUT */}
            <input type="text" onChange={this.handleChange} name="location" placeholder="The Nearest Town/City To Where You Live *"></input>

            {/* DOB INPUT */}
            <input type="date" onChange={this.handleChange} name="date_of_birth" placeholder="Date Of Birth *"></input>

            {/* GENDER INPUT */}
            <p> {"Gender Identity?"} </p>
            <span> Female  <input type="range"  onChange={this.handleChange} max="100" min="-100" step="1" name="gender" placeholder="Your Gender *"></input>  Male </span>
            <br></br><br></br>

            {/* BIO/DESCRIPTION INPUT  */}
            <p>About You:</p>
            <textarea name="description" onChange={this.handleChange} placeholder="Description (max 500 characters) *" maxlength="500"></textarea>

            {/*INTERESTS INPUT (EMOJI's)  */}
            <label for="job">Interests:</label>
              <input type="text" onChange={this.handleChange} data-emojiable="true"  maxlength="5" name="interests" placeholder="Pick five emojis that represent your interests"></input>

      </fieldset>





      {/* SOCIAL MEDIA SECTION */}
            <fieldset>
              <legend><span class="number"></span>Social Reach</legend>
              <input type="text" onChange={this.handleChange} name="twitter_handle" placeholder="Twitter         (enter the bit after 'twitter.com/') "></input>
              <input type="text" onChange={this.handleChange} name="instagram_handle" placeholder="Instagram   (enter the bit after 'instagram.com/') "></input>
              <input type="text" onChange={this.handleChange} name="youtube_handle" placeholder="YouTube     (enter the bit after 'youtube.com/user/') "></input>
              <input type="text" onChange={this.handleChange} name="facebook_handle" placeholder="Facebook     (enter the bit after 'facebook.com/') "></input>
              <input type="text" onChange={this.handleChange} name="snapchat" placeholder="SnapChat     (enter the bit after 'snapchat.com') "></input>
              <input type="text" onChange={this.handleChange} name="spotify_handle" placeholder="Spotify    (ARTISTS ONLY!)"></input>
            </fieldset>


      {/* OTHER INFO ECTION */}
        <fieldset>
          <legend><span class="number"></span>Additional Info</legend>
          <textarea name="additional_info" onChange={this.handleChange} placeholder="Anything else you want to tell the world?" maxlength="120"></textarea>
        </fieldset>

      {/* PHOTO UPLOAD SECTION */}
      {photoUpload}

      {/*  SAVE BUTTON */}
        <br></br>
          <input type="submit"  name="field12" class="Save"></input>

        </form>
      </div>


      {/* PROFILE INFO INPUT FORM END */}

        </div>
      )
    }

    else {
      return (

        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
    }


    }

}

export default Register;

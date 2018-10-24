import React, { Component } from "react";
import axios from 'axios';
import PasswordMask from 'react-password-mask';

class Update extends Component {
  constructor(props) {
    super(props);

      this.state = {

        reachUpdated: false,

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
          image1:'empty',
          image2:'empty',
          image3:'empty',
          image4:'empty',
          image5:'empty',
          image6:'empty',
          image1_message: 'choose a picture',
          image2_message: '5 slots left',
          image3_message: '4 slots left',
          image4_message: '3 slots left',
          image5_message: '2 slots left',
          image6_message: '1 slot left, make it count!',
          photo1: '',
          photo2: '',
          photo3: '',
          photo4: '',
          photo5: '',
          photo6: ''


        }

      this.updateReach = this.updateReach.bind(this)

  }

  handleChange(evt){
     this.setState({
       [evt.target.name]: evt.target.value
     })
  }


  fileChangedHandler(event){
    console.log(event.target.id);
    console.log(event.target.files);
    let photo = event.target.name
    let image = event.target.id
    let message = image + '_message'
    console.log();

    let count = event.target.attributes.index.nodeValue
    let preview_image = "image" + count
    let reader = new FileReader()
    reader.onloadend = () => {
      /* do not draw new upload button if 6 photos have been uploaded or image is being replaced */
      if (this.state.image_count.length < 6 && this.state[preview_image] === 'empty'){
      this.setState(prevState => ({ image_count: [...prevState.image_count, prevState.image_count.length+1]}))
    }
      this.setState({
        [image]: reader.result
        })

       }
  if (event.target.files[0] != undefined ){
    reader.readAsDataURL(event.target.files[0])
    }
  this.setState(prevState => ({
  upload_status: {
      ...prevState.upload_status,
      [photo]: 'foto-upload-ready'
  }
  }))
  this.setState({
    [event.target.name]: event.target.files[0],
    [message]: "tap to change"

      })

}




  updateReach(){

    var username = this.props.loggedInAs;

    var user = this.props.data.user;
    var name = this.props.data.name;
    var bio = this.props.data.bio;
    var looking_for = this.props.data.looking_for;
    console.log("LOOKING FOR", looking_for);
    console.log("USER", user);
    var location = this.props.data.location;
    var date_of_birth = this.props.data.date_of_birth;
    var gender = this.props.data.gender_identity;
    var twitter_handle = this.props.data.twitter_handle;
    var instagram_handle = this.props.data.instagram_handle;
    var youtube_handle = this.props.data.youtube_handle;
    var twitter_followers = this.props.data.twitter_followers;
    var instagram_followers = this.props.data.instagram_followers;
    var youtube_followers = this.props.data.youtube_followers;
    var picture_one = this.props.data.picture;
    var picture_two = this.props.data.picture_two;
    var picture_three = this.props.data.picture_three;
    var picture_four = this.props.data.picture_four;
    var picture_five = this.props.data.picture_five;
    var picture_six = this.props.data.picture_six;

    var token_passed_from_main = this.props.token_to_pass_on;

    var self = this;

    var update_reach_url = `http://localhost:8080/social_reach/profiles`

    const formData = new FormData();
    // formData.append('picture', picture_one);
    // formData.append('picture_two', picture_two);
    // formData.append('picture_three', picture_three);
    // formData.append('picture_four', picture_four);
    // formData.append('picture_five', picture_five);
    // formData.append('picture_six', picture_six);
    formData.append('name', name);
    // formData.append('user', user);
    formData.append('bio', bio);
    // formData.append('looking_for', looking_for);
    formData.append('location', location);
    formData.append('date_of_birth', date_of_birth);
    formData.append('gender_identity', gender);
    formData.append('twitter_handle', twitter_handle);
    formData.append('instagram_handle', instagram_handle);
    formData.append('youtube_handle', youtube_handle);
    formData.append('twitter_followers', twitter_followers);
    formData.append('instagram_followers', instagram_followers);
    formData.append('youtube_followers', youtube_followers);

    console.log(formData);

    axios.patch(`http://localhost:8080/social_reach/profiles/${username}/`,
      formData
   ,
 { headers: { 'Authorization': `JWT ${token_passed_from_main}` , 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } }).then(function (response) {
    self.setState({
      reachUpdated: true
    })
    console.log("REACH UPDATED");
}).catch(function(error){
console.log(error);
console.log("Error updating Reach.");
})
}

  render(){

    var photoUpload =  this.state.image_count.map(index => {
      let name = "photo" + index
      let id = "image" + index
      let message = id + '_message'
      let backgroundImage = {
        backgroundImage: `url(${this.state[id]})`,
        backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'noRepeat'
      }
      return (
        <fieldset class="photo_upload_container">

          <label for={id}  style={backgroundImage} altText="uploaded image" class={this.state.upload_status[`${name}`]}></label>
           <div class="overlay" index={index} >{this.state[message]}</div>
          <input type="file" index={index} onChange={this.fileChangedHandler} name={name} id={id} class={this.state.upload_status[`${name}`]} ></input>

        </fieldset>

      )
    })

    var test = new Array(0);


    var remaining_slots = new Array(6 -  this.state.image_count.length).join().split(',')
  .map(function(item, index){ return ++index;})
    console.log("hello slots",remaining_slots);
    var emptySlotPlaceholder = null;

    if (this.state.image_count.length === 6){
       emptySlotPlaceholder = '';
    }else{
    emptySlotPlaceholder = remaining_slots.map(index => {
      return (
            <fieldset class="photo_upload_container">

        <div class="empty_slot_placeholder">
        </div>
          </fieldset>

      )
    })
  }

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



    return(

      <div>

      <div className="pulsating-circle" onClick={this.updateReach}>Update My Reach!</div>

      <div className="register">

      <h6 align="center" style={{fontWeight: 'bold'}}>Hey {this.props.loggedInAs}! {"This is where you can update your profile."}</h6>
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
            <option value="Any">Any</option>
            <option value="Girls">Girls</option>
            <option value="Guys">Guys</option>
          </select>


          {/* LOCATION INPUT */}
          <input type="text" onChange={this.handleChange} name="location" placeholder="The Nearest Town/City To Where You Live *"></input>

          {/* DOB INPUT */}
          <input type="date" onChange={this.handleChange} name="date_of_birth" placeholder="Date Of Birth *"></input>

          {/* GENDER INPUT */}
          <p> Gender Identity? </p>
          <span> Female  <input type="range"  onChange={this.handleChange} max="99" min="-100" step="1" name="gender" placeholder="Your Gender *"></input>  Male </span>
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
      <legend><span class="number"></span>Photos</legend>
            <div class="flex_upload">
    {photoUpload}
    {emptySlotPlaceholder}
  </div>

    {/*  SAVE BUTTON */}
      <br></br>
        <input type="submit"  name="field12" class="Save"></input>

      </form>
    </div>


    {/* PROFILE INFO INPUT FORM END */}

      </div>

      </div>

    )
  }
}


export default Update;

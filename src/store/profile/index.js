import StoreModule from "../module";
 class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      waiting: false
    }
  }

  async getProfileInfo(token) {
    this.setState({
      profile: {},
      waiting: true,
      error: null
    });
    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();
      if(json.error) {
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message
        })
      } else {
        this.setState({
          profile: {
            email: json.result.email,
            name: json.result.profile.name,
            phone: json.result.profile.phone,
          },
          waiting: false,
        });
      }
    } catch(err) {
      console.error(err);
      this.setState({
        profile: {},
        waiting: false,
      });
    }
  }

  resetProfileInfo() {
    this.setState({
      ...this.initState()
    })
  }
}

 export default ProfileState;
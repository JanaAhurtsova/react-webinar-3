import StoreModule from "../module";
 class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      waiting: false
    }
  }

  async getProfileInfo(token) {
    try {
      if(token) {
        this.setState({
          profile: {},
          waiting: true,
        });
        const response = await fetch("/api/v1/users/self?fields=*", {
          headers: {
            "Content-Type": "application/json",
            "X-Token": token,
          },
        });
        const json = await response.json();

        if(response.ok) {
          this.setState({
            profile: {
              email: json.result.email,
              name: json.result.profile.name,
              phone: json.result.profile.phone,
            },
            waiting: false,
          });
        }
      }
    } catch(err) {
      console.error(err)
    }
  }

  resetProfileInfo() {
    this.setState({
      ...this.initState()
    })
  }
}

 export default ProfileState;
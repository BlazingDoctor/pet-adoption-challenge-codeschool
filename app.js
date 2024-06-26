URL = "http://localhost:8080";

Vue.createApp({
  data() {
    return {
      pets: [],
      applications: [],

      applicationtoggle: false,
      pettoggle: true,

      petName: "",
      petSpecies: "",
      petBreed: "",
      petAge: "",
      petGender: "",

      appName: "",
      appPhonenumber: "",
      appEmail: "",
      appPetid: "",

      newPets: {
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
      },
      newApplications: {
        name: "",
        phonenumber: "",
        email: "",
        petid: "",
      },
      deleteName: "",
    };
  },

  methods: {
    loadPets: async function () {
      let resp = await fetch(`${URL}/pets`);
      this.pets = await resp.json();
      this.pets.forEach((pet) => console.log(pet));
    },

    loadApplications: async function () {
      let resp = await fetch(`${URL}/applications`);
      this.applications = await resp.json();
      this.applications.forEach((application) => console.log(application));
    },
    addPets: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "name=" +
        encodeURIComponent(this.newPets.name) +
        "&species=" +
        encodeURIComponent(this.newPets.species) +
        "&breed=" +
        encodeURIComponent(this.newPets.breed) +
        "&age=" +
        encodeURIComponent(this.newPets.age) +
        "&gender=" +
        encodeURIComponent(this.newPets.gender);

      let requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      let response = await fetch(`${URL}/pets`, requestOptions);
      console.log(response);
      if (response.status == 201) {
        this.pets.push(this.newPets);

        this.newPets = {
          name: "",
          species: "",
          breed: "",
          age: "",
          gender: "",
        };
        console.log(this.pets);
        this.loadPets();
        //this is where addPets updates the frontend main variable
      } else {
        alert("Error failed adding pets");
      }
    },

    addApplications: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "name=" +
        encodeURIComponent(this.newApplications.name) +
        "&phonenumber=" +
        encodeURIComponent(this.newApplications.phonenumber) +
        "&email=" +
        encodeURIComponent(this.newApplications.email) +
        "&petid=" +
        encodeURIComponent(this.newApplications.petid);

      let requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      let response = await fetch(`${URL}/applications`, requestOptions);
      console.log(response);
      if (response.status == 201) {
        this.applications.push(this.newPets);

        this.newApplications = {
          name: "",
          phonenumber: "",
          email: "",
          petid: "",
        };
        console.log(this.applications);
        this.loadApplications();
        //this is where addApplications updates the frontend main variable
      } else {
        alert("Error failed adding application");
      }
    },

    // deleteCat: async function (catname) {
    //   //index is called from frontend main variable, so the fix for the bug when adding something
    //   //and not able to delete it from expense tracker is to call the update function
    //   //in addcats
    //   let index = this.cats.findIndex((cat) => cat.name == catname);
    //   console.log(index);
    //   console.log("delete");
    //   console.log(this.cats[index]._id);
    //   let response = await fetch(`${URL}/cats/${this.cats[index]._id}`, {
    //     method: "DELETE",
    //   });
    //   if (response.status == 204) {
    //     this.loadCats();
    //   } else {
    //     console.log("Error deleting cats");
    //     alert("Error deleting cats");
    //   }
    // },
  },

  created: function () {
    console.log("vue app loaded!");
    this.loadPets();
    this.loadApplications();
  },
}).mount("#app");

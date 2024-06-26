URL = "http://localhost:8080";

Vue.createApp({
  data() {
    return {
      pets: [],
      applications: [],

      applicationtoggle: false,
      pettoggle: true,

      newPets: {
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
      },
      newApplications: {
        name: "",
        phoneNumber: "",
        email: "",
        petId: "",
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
        "&phoneNumber=" +
        encodeURIComponent(this.newApplications.phoneNumber) +
        "&email=" +
        encodeURIComponent(this.newApplications.email) +
        "&petId=" +
        encodeURIComponent(this.newApplications.petId);

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
          phoneNumber: "",
          email: "",
          petId: "",
        };
        console.log(this.applications);
        this.loadApplications();
        //this is where addApplications updates the frontend main variable
      } else {
        alert("Error failed adding application");
      }
    },

    deletePet: async function (index) {
      //index is called from frontend main variable, so the fix for the bug when adding something
      //and not able to delete it from expense tracker is to call the update function
      //in addcats
      console.log(index);
      console.log("delete");
      console.log(this.pets[index]._id);
      let response = await fetch(`${URL}/pets/${this.pets[index]._id}`, {
        method: "DELETE",
      });
      if (response.status == 204) {
        this.loadPets();
      } else {
        console.log("Error deleting pets");
        alert("Error deleting pets");
      }
    },

    deleteApplication: async function (index) {
      console.log("delete");
      console.log(this.applications[index]._id);
      let response = await fetch(
        `${URL}/applications/${this.applications[index]._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status == 204) {
        this.loadApplications();
      } else {
        console.log("Error deleting application");
        alert("Error deleting application");
      }
    },
  },

  created: function () {
    console.log("vue app loaded!");
    this.loadPets();
    this.loadApplications();
  },
}).mount("#app");

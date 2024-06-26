URL = "http://localhost:8080";

Vue.createApp({
  data() {
    return {
      cats: [],
      cat_name: "",
      cat_count: "",
      newCats: {
        name: "",
        count: "",
      },
      deleteName: "",
      
    };
  },

  methods: {
    loadCats: async function () {
      let resp = await fetch(`${URL}/cats`);
      this.cats = await resp.json();
      this.cats.forEach((cat) => console.log(cat));
      

    },
    addCats: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "name=" +
        encodeURIComponent(this.newCats.name) +
        "&count=" +
        encodeURIComponent(this.newCats.count);

      let requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      let response = await fetch(`${URL}/cats`, requestOptions);
      console.log(response);
      if (response.status == 201) {
        this.cats.push(this.newCats);

        this.newCats = {
          name: "",
          count: "",
        };
        console.log(this.cats);
        this.loadCats();
        //this is where addcats updates the frontend main variable
      } else {
        alert("Error failed adding");
      }
    },
    deleteCat: async function (catname) {
      //index is called from frontend main variable, so the fix for the bug when adding something
      //and not able to delete it from expense tracker is to call the update function
      //in addcats
      let index = this.cats.findIndex((cat) => cat.name == catname);
      console.log(index);
      console.log("delete");
      console.log(this.cats[index]._id);
      let response = await fetch(`${URL}/cats/${this.cats[index]._id}`, {
        method: "DELETE",
      });
      if (response.status == 204) {
        this.loadCats();
      } else {
        console.log("Error deleting cats");
        alert("Error deleting cats");
      }
    },
  },

  created: function () {
    console.log("vue app loaded!");
    this.loadCats();
  },
}).mount("#app");

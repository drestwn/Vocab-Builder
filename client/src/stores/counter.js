import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

const base_url = `http://localhost:3000`;
// const base_url = `https://vocab-builder-production.up.railway.app`

export const useRenderStore = defineStore("renderWord", {
  state: () => ({
    dataWord: {},
    definitionWORD: {},
    statusAward: false,
    dataLogs: {},
    detailLog: {},
    score: 0,
  }),
  actions: {
    async renderInventory() {
      try {
        const response = await axios.get(`${base_url}/renderword`);
        console.log(response.data.WORD, "Response!");
        this.dataWord = response.data.WORD;
        this.definitionWORD = response.data.definition;
      } catch (err) {
        console.log(err);
      }
    },
    async inputLogs(input) {
      try {
        if (this.dataWord && input && this.dataWord === input.valueInput) {
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            access_token: localStorage.getItem("access_token"),
          };

          const data = input.valueInput;
          const response = await axios.post(
            `${base_url}/submitLog`,
            { WORD: data },
            { headers }
          );

          function calculateScore(input) {
            const length = input.length;
            let score = 0;

            if (length >= 3 && length <= 6) {
              score = length - 2;
            } else if (length >= 7 && length <= 10) {
              score = length * 2 - 14;
            }

            return Math.max(0, Math.min(10, score));
          }
          this.score = calculateScore(data);

          Swal.fire({
            icon: "success",
            title: `start your journey`,
            text: `GOOD JOB! your score are ${this.score} Play your next word~~`,
          });
          this.renderInventory();
        } else {
          Swal.fire({
            icon: "error",
            title: `Your Input is wrong!`,
            text: `You just need to try again!`,
          });
          this.renderInventory();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async renderLogs() {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          access_token: localStorage.getItem("access_token"),
        };
        const response = await axios.get(`${base_url}/renderLog`, { headers });
        this.dataLogs = response.data.response;
      } catch (err) {
        console.log(err);
      }
    },
    async renderDetailLog(id) {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          access_token: localStorage.getItem("access_token"),
        };
        const response = await axios.get(`${base_url}/renderDetailLog/${id}`, {
          headers,
        });
        this.detailLog = response.data.response;
        router.push("/edit");
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const useSubmitStore = defineStore("submitWord", {
  state: () => ({
    dataSubmit: {},
  }),
  actions: {
    async submitEdit(id, data) {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          access_token: localStorage.getItem("access_token"),
        };
        const response = await axios.post(`${base_url}/logUpdate/${id}`, data, {
          headers,
        });
        router.push("/progress");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
export const useloginStore = defineStore("submitLogin", {
  state: () => ({
    dataLogin: {},
    statusLoggin: false,
  }),
  actions: {
    async loginSubmit(data) {
      try {
        const headers = { "Content-Type": "application/x-www-form-urlencoded" };
        const response = await axios.post(`${base_url}/loginUser`, data, {
          headers,
        });
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("email", response.data.email);
        this.statusLoggin = true;
        Swal.fire({
          icon: "success",
          title: `Welcome!`,
          text: `Hello ${response.data.email}, now you can access more menu! `,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Too bad!`,
          text: `${err.response.data.error} `,
        });
        console.log(err.response.data.error);
      }
    },
    logOut() {
      this.statusLoggin = false;
      localStorage.clear();
      Swal.fire({
        icon: "success",
        title: `We are waiting for you !`,
        text: `We are waiting for you to learning with us again next time!`,
      });
    },
    checkStatus() {
      if (localStorage.getItem("access_token")) {
        this.statusLoggin = true;
      } else {
        this.statusLoggin = false;
      }
    },
    async callback(response) {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        const data = await axios.post(
          `${base_url}/googleLog`,
          { token_google: response.credential },
          { headers }
        );
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("email", data.data.email);

        this.statusLoggin = true;
        Swal.fire({
          icon: "success",
          title: `start your journey`,
          text: `login success`,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.error}`,
          text: `Please Handle`,
        });
      }
    },
  },
});

export const useDeleteStore = defineStore("deleteStore", {
  state: () => ({}),
  actions: {
    async deleteLog(id) {
      try {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          access_token: localStorage.getItem("access_token"),
        };
        const response = await axios.delete(`${base_url}/deleteLog/${id}`, {
          headers,
        });
        Swal.fire({
          icon: "success",
          title: `success`,
          text: `Your card has been deleted`,
        });
        router.push("/progress");
      } catch (err) {
        console.log(err);
      }
    },
  },
  // ,
  // get actions() {
  //   return this._actions
  // },
  // set actions(value) {
  //   this._actions = value
  // },
});

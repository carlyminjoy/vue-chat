<template lang="html">
  <v-flex md8 offset-md2 class="pt-1" @submit.prevent="sendMessage">
    <v-form style="width:100%">
    <v-text-field
      label="Solo"
      placeholder="Type Your Message"
      v-model="message"
      solo
      ref="message"
      >
    </v-text-field>
    </v-form>
  </v-flex>

</template>

<script>
export default {
  data () {
    return {
      message : ""
    }
  },
  methods : {
    async sendMessage(){
      let handle = this.$store.getters.HANDLE;
      if(this.message){
        let message = {
            handle : handle,
            message : this.message
          }
        let response = await this.$socket.emit('chat',message)
        console.log(response);
        this.message = ""
      }
    },
  }
}
</script>
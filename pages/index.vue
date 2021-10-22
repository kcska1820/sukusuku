<template>
    <v-app>
        <div
        class="d-flex justify-center"
        >
            <sukusukuLogo />
        </div><br>
        <div
        class="d-flex justify-center"
        >
            <p>スクスクはあなたの学生生活をより良いものにします。</p>
        </div>
    </v-app>
</template>

<script>
export default {
    created(){
        setTimeout(()=>{
            this.$router.push('/login')
        },2*1000)
    }
}

</script>
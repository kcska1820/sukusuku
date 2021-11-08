<template>
    <div>
        <v-menu
            bottom
            min-width="150px"
            rounded
            offset-y
        >
            <template v-slot:activator="{ on}">
            <v-btn
                v-on="on"
                fab
                elevation=0
                color="accent"
                height=46px
                width=46px
            >
                <v-icon color="white" size="2.5em">
                    {{notice ? 'mdi-bell':'mdi-bell-badge'}}
                </v-icon>
            </v-btn>
            </template>
            <v-card>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <div class="pa-2 mb-2">
                            <h3>通知</h3>
                        </div>
                        <v-divider />
                        <div class="pa-1 mt-2">
                            <v-btn
                                depressed
                                rounded
                                text
                            >
                                通知
                            </v-btn>
                        </div>
                        <div class="pa-1">
                            <v-btn
                                depressed
                                rounded
                                text
                                color="red darken-2"
                            >
                                キャンセル
                            </v-btn>
                        </div>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            notice:false,
            menu: false,
        }
    }
}
</script>

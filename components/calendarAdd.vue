<template>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="error"
                v-bind="attrs"
                v-on="on"
                icon
            >
                <v-icon>
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>
        <v-container fluid fill-height>
            <v-layout xs12 sm8 md4>
                <v-flex>
                    <v-card>
                        <v-toolbar color="accent">
                            <v-toolbar-title>
                                予定追加
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field label="開始日時"></v-text-field>
                                <v-text-field label="終了日時"></v-text-field>
                                <v-text-field label="タイトル"></v-text-field>
                                <v-text-field label="内容"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="red darken-2"
                                text
                                @click="dialog = false"
                            >
                                閉じる
                            </v-btn>
                            <v-spacer />
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                追加
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
    }),
}
</script>

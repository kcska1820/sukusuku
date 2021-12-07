/*
使い方
1.
vueの<script>内、頭に
import searchsup from '/components/searchSup' を挿入(searchsupを書き換えて関数名を変えられる)

2.
script内に保管用の変数を定義(sql:'',)
URL保管用の変数も別で定義(srcurl:'',)

3.
SQL文を作るメソッドで
this.sql = searchsup(入力されたキーワード, 検索したい列の名前)
this.srcurl = 'Django側のメソッド/' + this.sql.sql

備考…スペースが連続で入力された場合の対処法が必要
*/
const makekwd = (kwd, tb) => {
    let flag = true
    let res = ""

    if (kwd == "" || /^\s+$/.test(kwd)) {
        //入力されたキーワードがnull、もしくは空白のみ
        return {
            //条件指定なし、全件取得
            sql: ""
        }
    } else {
        //全角スペースを半角スペースに変換
        const kwd2 = kwd.replace("　", " ")
        if (/.*\s.*/.test(kwd2)) {
            //スペースで配列に分割
            const kwds = kwd2.split(" ")
            for (let i in kwds) {
                if (flag == true) {
                    res = "\?" + tb + "=%" + kwds[i] + "%"
                    flag = false
                } else {
                    res += "&" + tb + "=%" + kwds[i] + "%"
                }
            }
        } else {
            //キーワードにスペースが無かった
            res = "\?" + tb + "=%" + kwd + "%"
        }
        return {
            sql: res
            //?title=%aaa%&title=%bbb%
        }
    }
}

export default makekwd
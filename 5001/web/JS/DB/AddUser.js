function addUser(formData){      //传递formdata参数
                                 //仓库名称，数据库名称，数据库版本
    let storeName = 'userStore',dbName = 'userDB', version = 2
 //将浏览器中的indexedDB数据库引入
    let indexedDB = window.indexedDB
    //数据库对象变量
    let db
    //创建或者连接数据库
    const request = indexedDB.open(dbName, version)
    //信息注册对象
    var newItem = [
        {
            "user_name":formData.get("user_name"),
            "user_email":formData.get("user_email"),
            "user_pwd":formData.get("user_pwd")
        }
    ];
    request.onsuccess = function(event) {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
        var transaction = db.transaction(["userStore"], "readwrite");//事务的读写操作
        //数据库添加用户：
        let objectStore = transaction.objectStore("userStore");
        let obj=objectStore.get(formData.get("user_name"));
        obj.onsuccess=function (evt){
            var res=evt.target.result;
            if(res!=null){
                Service("该用户名已经存在！")
            }
            else {
                objectStore.add(newItem[0])
                transaction = db.transaction(["userPwdStore"], "readwrite");
                //数据库添加用户：
                objectStore = transaction.objectStore("userPwdStore");
                objectStore.add(newItem1[0]);
                var click = confirm("注册成功，点击确定返回页面！")
                if (click) window.location.href = "Login.html"
            }
        }

        /*
        //转json字符串 转json对象.
        const objData = {};
        //(value, key) => objData[key] = value
        formData.forEach(function (curValue,index,arr) {
            objData[index] = curValue;
        });
        let objDataJson = JSON.parse(JSON.stringify(objData));
        console.log(objDataJson);

        //转json字符串 转json对象.
        */
    }
    request.onerror = function(event) {
        console.log('数据库打开报错')
    }
}


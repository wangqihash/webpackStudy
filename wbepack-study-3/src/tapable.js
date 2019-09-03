/*
 * @Description: webpack中tapbale事件流机制
 * @Author: wangqi
 * @Date: 2019-08-21 22:09:21
 * @LastEditTime: 2019-08-21 23:10:47
 */

 {
    //体现发布订阅模式
    class SyncHook{
        constructor(args){
            this.tasks = [];
        }

        tap(name, task){
            this.tasks.push(task);
        }
        
        call(...args){
            this.tasks.forEach((task)=>{
                task(...args)
            })
        }
        
    }

    let hook = new SyncHook(['name']);
    hook.tap('react', (name)=>{
        console.log('react', name);
    });

    hook.tap('node', (name)=>{
        console.log('node', name);
    });
    hook.call("wq");
 }

 {
     
 }

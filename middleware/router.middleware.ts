// 可以是异步的
export default function ({ route }:any) {
  console.log(route.path, 'router.middleware', Date.now())
}

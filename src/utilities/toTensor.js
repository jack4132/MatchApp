// export const transformImageToTensor = async (uri)=>{
//   //.ts: const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
//   //read the image as base64
//     const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64})
//     const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
//     const raw = new Uint8Array(imgBuffer)
//     let imgTensor = decodeJpeg(raw)
//     const scalar = tf.scalar(255)
//   //resize the image
//     imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [300, 300])
//   //normalize; if a normalization layer is in the model, this step can be skipped
//     const tensorScaled = imgTensor.div(scalar)
//   //final shape of the rensor
//     const img = tf.reshape(tensorScaled, [1,300,300,3])
//     return img
// }

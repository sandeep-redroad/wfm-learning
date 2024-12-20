const UploadData = []

for (let i = 1; i < 21; i++) {
    UploadData.push({
        id: crypto.randomUUID().slice(0, 3),
        status: randomIntFromInterval(1,3),
        uploaded_count: randomIntFromInterval(10,50),
        failed_count: randomIntFromInterval(10,50),
        uploaded_at : (new Date()).toDateString()
    })
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export default UploadData

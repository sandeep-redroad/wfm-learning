const ProjectData = []

for (let i = 1; i < 21; i++) {
    ProjectData.push({
        id: crypto.randomUUID().slice(0, 3),
        client: crypto.randomUUID().slice(3, 10),
        status: randomIntFromInterval(1,3),
        department : "RCM"
    })
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export default ProjectData

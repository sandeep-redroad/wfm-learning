const ClientData = []

for (let i = 1; i < 21; i++) {
    ClientData.push({
        id: crypto.randomUUID(),
        client: crypto.randomUUID(),
    })
}

export default ClientData

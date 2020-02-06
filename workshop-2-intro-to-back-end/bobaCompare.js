const compareBoba = (boba1, boba2) => {
    let keyList = []
    for (key in boba1) {
        if (boba1[key] != boba2[key]) {
            keyList.push(key);
        }
    }
    return keyList
}

let queue = []

function Board() {
    let visited = []
    for (let x = 0; x < 8; x++) {
        let row = []
        for (let y = 0; y < 8; y++) {
            row.push(false)
        }
        visited.push(row)
    } 

    let prevPos = []
    for (let x = 0; x < 8; x++) {
        let row = []
        for (let y = 0; y < 8; y++) {
            row.push(false)
        }
        prevPos.push(row)
    } 
    
    // check moves
    const validMoves = (x,y) => {
        return (x < 8 && x >= 0 && y < 8 && y >= 0)
    }
    

    // find all possible valid knight movements
    const knightPaths = (x,y) => {
        const moves = [[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]]
        const newMoves = moves.map(move => [move[0] + x, move[1]+y])
        return newMoves.filter(move => validMoves(move[0], move[1]))
    }


    return {
        visited,
        knightPaths,
        validMoves,
        prevPos
    }
}

function knightMoves(start,end) {
    const board = Board()

    //check validity of moves
    if (!board.validMoves(start[0], start[1]) || !board.validMoves(end[0], end[1])) {
        throw new Error("Use valid positions")
    }

    let queue = [start]
    
    while (queue.length !== 0) {
        const currentPos = queue.shift()

        // if reached goal
        if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
            // console.log(`${currentPos[0]} ${end[0]} ${currentPos[1]} ${end[1]}`)
            // console.log(board.prevPos)
            break
        }

        

        // if not reached, find possible paths
        let possibleMoves = board.knightPaths(currentPos[0], currentPos[1])
        //for each possible moves path
        possibleMoves.forEach(element => {
            //if already visited then skip
            if(board.visited[element[0]][element[1]]) {
                return
            }

            queue.push(element)
            // add current pos to visited
            board.visited[currentPos[0]][currentPos[1]] = true

            //add location of previous positions for current position
            board.prevPos[element[0]][element[1]] = [currentPos[0], currentPos[1]]
        })
    }

    const pathTaken = []
    currentPos = end
    while (currentPos[0] !== start[0] || currentPos[1] !== start[1]) {
        pathTaken.unshift(currentPos)
        currentPos = board.prevPos[currentPos[0]][currentPos[1]]       
    }
    pathTaken.unshift(start)

    console.log(`You made it in ${pathTaken.length} moves! Here's your path:`)

    pathTaken.forEach(element => console.log(element))

    return pathTaken
}


// console.log(board)
knightMoves([0,0],[7,7])
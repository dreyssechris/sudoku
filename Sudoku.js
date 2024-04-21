class Sudoku {
    constructor() {
        // 9 x 9 
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        // save to grid from user input, 
        // so that the grid can be reset to this (also for individual coroling of the solution)
        this.originalGrid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        // 3x3 grid to check if certain value is unique inside of it
        this.smallerGrid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.errorMessage = 
        "Invalid Sudoku: Values are not unique in row, column, or 3x3 grid.";
    }

    // Fields with invalid input (!1-9) are countet as empty (0)
    setGrid() {
        for(let i = 0; i < 81; i++) {
            const cellValue = parseInt(document.getElementById(`cell-${i}`).value);
            const row = Math.floor(i / 9);
            const col = i % 9;
            if(Number.isInteger(cellValue) && cellValue > 0 && cellValue <= 9) {
                this.grid[row][col] = cellValue;
                this.originalGrid[row][col] = cellValue;
            } else {
                this.grid[row][col] = 0; 
                this.originalGrid[row][col] = 0;
            }
        }
        console.log(this.grid); 
    }

    // Called when `Solve` was pressed
    // Translate 2D Grid into 1D Table
    loadSolvedGrid() {
        for (let i = 0; i < 81; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;
            if(this.originalGrid[row][col] != 0) {
                document.getElementById(`cell-${i}`).value = this.grid[row][col];
            } else {
                document.getElementById(`cell-${i}`).style.color = "blue";
                document.getElementById(`cell-${i}`).value = this.grid[row][col];
            }
            console.log("the grid value:", this.grid[row][col], typeof(this.grid[row][col]));
            console.log("the table value:",document.getElementById(`cell-${i}`).value);    
        }
    }

    // Method to call isValid() and check if a certain number is valid for the cell
    // Also check if the Sudoku can be solved in the first place
    solve() {
        if(!this.isSolveable()) {
            this.showToast(this.errorMessage);
            return false;
        }
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.grid[x][y] === 0) {
                    for (let i = 1; i <= 9; i++) {
                        if (this.isValid(x, y, i)) {
                            this.grid[x][y] = i;
                            if (this.solve()) {
                                return true; 
                            } else {
                                // reset to try different number
                                this.grid[x][y] = 0;
                            }
                        }
                    }
                    return false; 
                }
            }
        }
        return true; // when all field are filled 
    }

    // Called when `Whipe` was pressed - whipes all input fields
    whipe() {
        for (let i = 0; i < 81; i++) {
            document.getElementById(`cell-${i}`).style.color = "black";
            const cell = document.getElementById(`cell-${i}`);
            cell.value = '';
        }
    }

    // Called when `Reset` was pressed - resets fields to user input 
    reset() {
        for (let i = 0; i < 81; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;
            if(this.originalGrid[row][col] == 0) {
                document.getElementById(`cell-${i}`).value = ''; 
            } else {
                document.getElementById(`cell-${i}`).value = this.originalGrid[row][col];
            }
            document.getElementById(`cell-${i}`).style.color = "black"; 
        }
        console.log(this.originalGrid); 
    }

    showToast(message) {
        const error = document.getElementById("error");
        error.innerHTML = message;
        error.style.visibility = "visible";
    
        // Message should disappear after `x` seconds
        setTimeout(function() {
            error.style.visibility = "hidden";
            // So that the Sudoku has the same gap to the h1 as before
            error.innerHTML = ""; 
        }, 5000);
    }

/**
 * ************************************************************************************************************************************
 * 
 * Validation Area - would be in another file, but import doesn't work, somehow..
 * Rules:
 * - n must be unique in row and column
 * - n must be unique in its square (3x3 grid, aka smallerGrid)
 * 
 * ************************************************************************************************************************************
 */

    // check the square (3x3 grid)
    // check row and column
    // return validation state
    isValid(pos_x, pos_y, n) {
        let isValid = true; 
        // initialize the 3x3 grid to check
        this.splitGrid(pos_x, pos_y);

        // Check if row (pos_x) or collumn (pos_y) contains n already
        // Don't check the current spot,
        // cause then the check always fails -> important for isSolveable() method
        for(let i = 0; i < this.grid.length; i++) {
            // row                                        || column
            if((this.grid[i][pos_y] == n) && (i != pos_x) || (this.grid[pos_x][i] == n) && (i != pos_y)) {
                isValid = false;
                return isValid;
            }
        }

        // Also skip the current spot,
        // cause then the check will also fail for the isSolveable() method
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                if(this.smallerGrid[x][y] == n && !(x === pos_x % 3 && y === pos_y % 3)) {
                    isValid = false;
                    return isValid;
                }
            }
        }
        return isValid;
    }

    // You have a big grid of size 9x9
    // ...and wan't to make 9 smaller grids of size 3x3
    // ...but only the important one has to be touched
    // Room for optimization.. 
    splitGrid(pos_x, pos_y) {
        // first section
        if(pos_x < 3 && pos_y < 3) {
            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    this.smallerGrid[x][y] = this.grid[x][y]; 
                }
            }
        } else if(pos_x < 3 && pos_y > 2 && pos_y < 6 ) {
            for(let x = 0; x < 3; x++) {
                for(let y = 3; y < 6; y++) {
                    this.smallerGrid[x][y - 3] = this.grid[x][y]; 
                }
            }
        } else if(pos_x < 3 && pos_y > 5) {
            for(let x = 0; x < 3; x++) {
                for(let y = 6; y < 9; y++) {
                    this.smallerGrid[x][y - 6] = this.grid[x][y]; 
                }
            }
        // second section
        } else if(pos_x > 2 && pos_x < 6 && pos_y < 3) {
            for(let x = 3; x < 6; x++) {
                for(let y = 0; y < 3; y++) {
                    this.smallerGrid[x - 3][y] = this.grid[x][y];  
                }
            }
        } else if(pos_x > 2 && pos_x < 6 && pos_y > 2 && pos_y < 6) {
            for(let x = 3; x < 6; x++) {
                for(let y = 3; y < 6; y++) {
                    this.smallerGrid[x - 3][y - 3] = this.grid[x][y];  
                }
            }
        } else if(pos_x > 2 && pos_x < 6 && pos_y > 5) {
            for(let x = 3; x < 6; x++) {
                for(let y = 6; y < 9; y++) {
                    this.smallerGrid[x - 3][y - 6] = this.grid[x][y];  
                }
            }
        // third section
        } else if(pos_x > 5 && pos_y < 3) {
            for(let x = 6; x < 9; x++) {
                for(let y = 0; y < 3; y++) {
                    this.smallerGrid[x - 6][y] = this.grid[x][y];  
                }
            }
        } else if(pos_x > 5 && pos_y > 2 && pos_y < 6) {
            for(let x = 6; x < 9; x++) {
                for(let y = 3; y < 6; y++) {
                    this.smallerGrid[x - 6][y - 3] = this.grid[x][y];  
                }
            }
        } else if(pos_x > 5 && pos_y > 5) {
            for(let x = 6; x < 9; x++) {
                for(let y = 6; y < 9; y++) {
                    this.smallerGrid[x - 6][y - 6] = this.grid[x][y];  
                }
            }
        }
    }

    // Check beforehand, if the originalGrid is solveable
    isSolveable() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.originalGrid[x][y] !== 0) {
                    if (!this.isValid(x, y, this.originalGrid[x][y])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
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
        // save to grid from user input, so that all upcomming numbers can receive a different coloring
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
        // x = 0 - 2
        // y = 0 - 2
        this.grid1 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        // x = 0 - 2 
        // y = 3 - 5
        this.grid2 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        // x = 0 - 2 
        // y = 6 - 8
        this.grid3 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        // x = 3 - 5 
        // y = 0 - 2
        this.grid4 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        // x = 3 - 5 
        // y = 3 - 5
        this.grid5 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        // x = 3 - 5 
        // y = 6 - 8
        this.grid6 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        // x = 6 - 8 
        // y = 0 - 2 
        this.grid7 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        // x = 6 - 8 
        // y = 3 - 5
        this.grid8 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
        // x = 6 - 8 
        // y = 6 - 8
        this.grid9 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]; 
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
    solve() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (this.grid[x][y] === 0) {
                    for (let i = 1; i <= 9; i++) {
                        if (this.isValid(x, y, i)) {
                            this.grid[x][y] = i;
                            if (this.solve()) {
                                return true; 
                            } else {
                                this.grid[x][y] = 0; // reset to try different number
                            }
                        }
                    }
                    return false; // Keine gültige Zahl gefunden, unerreichbarer Zustand
                }
            }
        }
        return true; // Alle Felder gefüllt, Rätsel gelöst
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

/**
 * ************************************************************************************************************************************
 * 
 * Validation Area - would be in another file, but import doesn't work, somehow..
 * Rules:
 * - n must be unique in row and column
 * - n must be unique in its square (3x3 grid, aka gridToCheck)
 * 
 * ************************************************************************************************************************************
 */

    // check the square (3x3 grid)
    // check row and column
    // return validation state
    isValid(pos_x, pos_y, n) {
        let isValid = true;    
        // get the 3x3 grid to check
        let gridToCheck = this.splitGrid(pos_x, pos_y);

        // Check if row (pos_x) or collumn (pos_y) contains n already
        for(let x = 0; x < this.grid.length; x++) {
            if(this.grid[x][pos_y] == n || this.grid[pos_x][x] == n) {
                isValid = false;
                return isValid; 
            }
        }

        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                if(gridToCheck[x][y] == n) {
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
    splitGrid(pos_x, pos_y) {
        // first section
        if(pos_x < 3 && pos_y < 3) {
            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    this.grid1[x][y] = this.grid[x][y]; 
                }
            }
            console.log(this.grid1);
            return this.grid1;
        } else if(pos_x < 3 && pos_y > 2 && pos_y < 6 ) {
            for(let x = 0; x < 3; x++) {
                for(let y = 3; y < 6; y++) {
                    this.grid2[x][y - 3] = this.grid[x][y]; 
                }
            }
            return this.grid2;
        } else if(pos_x < 3 && pos_y > 5) {
            for(let x = 0; x < 3; x++) {
                for(let y = 6; y < 9; y++) {
                    this.grid3[x][y - 6] = this.grid[x][y]; 
                }
            }
            return this.grid3;
        // second section
        } else if(pos_x > 2 && pos_x < 6 && pos_y < 3) {
            for(let x = 3; x < 6; x++) {
                for(let y = 0; y < 3; y++) {
                    this.grid4[x - 3][y] = this.grid[x][y];  
                }
            }
            return this.grid4;
        } else if(pos_x > 2 && pos_x < 6 && pos_y > 2 && pos_y < 6) {
            for(let x = 3; x < 6; x++) {
                for(let y = 3; y < 6; y++) {
                    this.grid5[x - 3][y - 3] = this.grid[x][y];  
                }
            }
            return this.grid5;
        } else if(pos_x > 2 && pos_x < 6 && pos_y > 5) {
            for(let x = 3; x < 6; x++) {
                for(let y = 6; y < 9; y++) {
                    this.grid6[x - 3][y - 6] = this.grid[x][y];  
                }
            }
            return this.grid6;
        // third section
        } else if(pos_x > 5 && pos_y < 3) {
            for(let x = 6; x < 9; x++) {
                for(let y = 0; y < 3; y++) {
                    this.grid7[x - 6][y] = this.grid[x][y];  
                }
            }
            return this.grid7;
        } else if(pos_x > 5 && pos_y > 2 && pos_y < 6) {
            for(let x = 6; x < 9; x++) {
                for(let y = 3; y < 6; y++) {
                    this.grid8[x - 6][y - 3] = this.grid[x][y];  
                }
            }
            return this.grid8;
        } else if(pos_x > 5 && pos_y > 5) {
            for(let x = 6; x < 9; x++) {
                for(let y = 6; y < 9; y++) {
                    this.grid9[x - 6][y - 6] = this.grid[x][y];  
                }
            }
            return this.grid9;
        }

        // Satisfying the Syntax
        return null;
    }
}
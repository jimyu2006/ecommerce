function LineCheck(array, row, col, color) {
    this.row = row;
    this.col = col;
    this.array = array;
    this.color = color;
    this.result = [];
}
LineCheck.prototype = {
    checkLeftMost: function (color) {
        var oriCol = this.col;
        while (oriCol >= 0) {
            if (oriCol - 1 >= 0) {
                if (this.array[this.row][oriCol - 1].v == 1 ||  this.array[this.row][oriCol - 1].c != color) {
                    return oriCol;
                }
                oriCol--;
            }
            else
                return 0;
        }
        return 0;
    },
    checkTopMost: function (color) {
        var oriRow = this.row;
        while (oriRow >= 0) {
            if (oriRow - 1 >= 0) {
                if (this.array[oriRow - 1][this.col].v == 1 || this.array[oriRow - 1][this.col].c != color) {
                    return oriRow;
                }
                oriRow--;
            }
            else
                return 0;
        }
        return 0;
    },
    checkRightMost: function (color) {
        var oriCol = this.col;
        while (oriCol <= 7) {
            if (oriCol + 1 <= 7) {
                if (this.array[this.row][oriCol + 1].v == 1 || this.array[this.row][oriCol + 1].c != color) {
                    return oriCol;
                }
                oriCol++;
            }
            else
                return 7;
        }
        return 7;
    },
    checkBottomMost: function (color) {
        var oriRow = this.row;
        while (oriRow <= 7) {
            if (oriRow + 1 <= 7) {
                if (this.array[oriRow + 1][this.col].v == 1 || this.array[oriRow + 1][this.col].c != color) {
                    return oriRow;
                }
                oriRow++;
            }
            else
                return 7;
        }
        return 7;
    },
    checkL2BMost: function (color) {
        var oriRow = this.row;
        var oriCol = this.col;
        while (oriRow <= 7 && oriCol <= 7) {
            if (oriRow + 1 <= 7 && oriCol + 1 <= 7) {
                if (this.array[oriRow + 1][oriCol + 1].v == 1 || this.array[oriRow + 1][oriCol + 1].c != color) {
                    return oriRow;
                }
                oriRow++;
                oriCol++;
            }
            else {
                return oriRow;
            }
        }
        return oriRow;
    },
    checkL2TMost: function (color) {
        var oriRow = this.row;
        var oriCol = this.col;
        while (oriRow >= 0 && oriCol >= 0) {
            if (oriRow - 1 >= 0 && oriCol - 1 >= 0) {
                if (this.array[oriRow - 1][oriCol - 1].v == 1 || this.array[oriRow - 1][oriCol - 1].c != color) {
                    return oriRow;
                }
                oriRow--;
                oriCol--;
            }
            else {
                return oriRow;
            }
        }
        return oriRow;
    },
    checkR2BMost: function (color) {
        var oriRow = this.row;
        var oriCol = this.col;
        while (oriRow <= 7 && oriCol >= 0) {
            if (oriRow + 1 <= 7 && oriCol - 1 >= 0) {
                if (this.array[oriRow + 1][oriCol - 1].v == 1 || this.array[oriRow + 1][oriCol - 1].c != color) {
                    return oriRow;
                }
                oriRow++;
                oriCol--;
            }
            else {
                return oriRow;
            }
        }
        return oriRow.toString() + oriCol.toString();
    },
    checkR2TMost: function (color) {
        var oriRow = this.row;
        var oriCol = this.col;
        while (oriCol <= 7 && oriRow >= 0) {
            if (oriCol + 1 <= 7 && oriRow - 1 >= 0) {
                if (this.array[oriRow - 1][oriCol + 1].v == 1 || this.array[oriRow - 1][oriCol + 1].c != color) {
                    return oriRow;
                }
                oriRow--;
                oriCol++;
            }
            else {
                return oriRow;
            }
        }
        return oriRow;
    },
    HorizontalCheck: function (color) {
        var lm = this.checkLeftMost(color);
        var rm = this.checkRightMost(color);
        if (rm - lm + 1 >= 5) {
            for (var i = lm; i <= rm; i++)
                this.result.push(this.row.toString() + i.toString()+color);
        }
    },
    VerticalCheck: function (color) {
        var tm = this.checkTopMost(color);
        var bm = this.checkBottomMost(color);
        if (bm - tm + 1 >= 5) {
            for (var i = tm; i <= bm; i++)
                this.result.push(i.toString() + this.col.toString() + color);
        }
    },
    LT2RBCheck: function (color) {
        var rm = this.checkL2BMost(color);
        var lm = this.checkL2TMost(color);
        if (rm - lm + 1 >= 5) {
            for (var i = lm; i <= rm; i++) {
                this.result.push(i.toString() + (this.col-(this.row-i)).toString() + color);
            }
        }
    },
    LB2RTCheck: function (color) {
        var lm = this.checkR2BMost(color);
        var rm = this.checkR2TMost(color);
        if (lm - rm + 1 >= 5) {
            for (var i = rm; i <= lm; i++) {
                this.result.push(i.toString() + (this.row + this.col - i).toString() + color);
            }
        }
    },
    getResult: function () {
        this.HorizontalCheck(this.color);
        this.VerticalCheck(this.color);
        this.LT2RBCheck(this.color);
        this.LB2RTCheck(this.color);
        return this.result;
    }
}
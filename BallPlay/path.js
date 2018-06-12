var array;
var size = 8;
var id = 0;
var leftCorner, topCorner;
var radius = 50;

var ballselected = false;
var startRow, startCol, startColor;

function Variables() {
    this.size = 5;
    this.radius = 50;

}
function CreateRandomBalls(arr, callback) {
    var colors = ["red", "green"];
    //var colors = ["red", "green", "blue", "purple", "yellow", "pink"];
    var rndColors = [];
    for (var c = 0; c < 3; c++) {
        var randomColor = colors[Math.floor(colors.length * Math.random())];
        var availableArray = [];
        for (var i = 0; i < arr.size; i++)
            for (var j = 0; j < arr.size; j++) {
                if (arr.matrix[i][j].v == 1)
                    availableArray.push(i.toString() + j.toString());
            }
        var pos = availableArray[Math.floor(availableArray.length * Math.random())];
        var row = Cord.getRow(pos);
        var col = Cord.getCol(pos);
        //id++;
        //ballselected = false;
        var newball = new Ball(row.toString() + col.toString(), randomColor, row, col);
        $("#basediv").append(newball.htmlString());
        arr.Set(row, col, randomColor);
        $("#ball_" + row + col).css({ "top": topCorner + row * radius, "left": leftCorner + col * radius });
    }
    if (callback != null) {
        callback();
    }
}


function Map(size, radius) {
    this.size = size;
    this.radius = radius;
}

Map.prototype = {
    init: function (element) {
        if (!$(element).find("div").length) {
            $(element).css({ "width": this.radius * this.size + 1, "height": this.radius * this.size + 1 });
            for (var i = 0; i < this.size; i++) {
                var divClass = "class=\"box\"";
                if (i == this.size - 1) divClass = "class=\"box bottomside\"";
                for (var j = 0; j < this.size; j++) {
                    if (j == this.size - 1) divClass = "class=\"box rightside\"";
                    $(element).append("<div " + divClass + " ></div>");
                }
            }
            this.top = $(element).position().top;
            this.left = $(element).position().left;
        }
    }
}

function Coordinate(value, color) {
    this.v = value;
    this.c = color;
}

function Matrix(size) {
    this.size = size;
    this.matrix = [];
    for (var i = 0; i < size; i++)
        this.matrix[i] = [];
}

Matrix.prototype = {
    Init: function () {
        for (var i = 0; i < this.size; i++)
            for (j = 0; j < this.size; j++) {
                this.matrix[i][j] = new Coordinate(1, null);
            }
    },
    Set: function (row, col, color) {
        var cord = new Coordinate(0, color);
        switch (color) {
            case "green":
                cord.c = "g";
                break;
            case "red":
                cord.c = "r";
                break;
            case "blue":
                cord.c = "b";
                break;
            case "pink":
                cord.c = "i";
                break;
            case "yellow":
                cord.c = "y";
                break;
            case "purple":
                cord.c = "p";
                break;
        }
        this.matrix[row][col] = cord;
    },
    UnSet: function (row, col) {
        this.matrix[row][col].v = 1;
        this.matrix[row][col].c = null;
    },
    GroupSet: function (cords) {
        for (var key in cords) {
            var cord = cords[key];
            this.Set(cord.row, cord.col);
        }
    },
    Clear: function (cords) {
        for (var key in cords) {
            var cord = cords[key];
            var row = parseInt(Cord.getRow(cord));
            var col = parseInt(Cord.getCol(cord));
            this.UnSet(row, col);
        }
    }
}


function Ball(id, type, row, col) {
    var pos = row.toString() + col.toString();
    switch (type) {
        case "green":
            pos += "g";
            break;
        case "red":
            pos += "r";
            break;
        case "blue":
            pos += "b";
            break;
        case "pink":
            pos += "i";
            break;
        case "yellow":
            pos += "y";
            break;
        case "purple":
            pos += "p";
            break;
    }
    this.newball = "<div class='ball " + type + "' id='ball_" + id + "' pos='" + pos + "'></div>";
    this.id = id;
}

Ball.prototype = {
    htmlString: function () {
        return this.newball;
    }
}


Cord = (function () {
    return {
        getRow: function (strCord) {
            return strCord.toString().substring(0, 1);
        },
        getCol: function (strCord) {
            return strCord.toString().substring(1, 2);
        },
        getColor: function (strCord) {
            if (strCord.length > 2)
                return strCord.toString().substring(2, 3);
            return null;
        },
        toPos: function (row, col, color) {
            if (color)
                return row.toString() + col.toString() + color;
            return row.toString() + col.toString();
        }
    }
})();

function Node(ID) {
    this.ID = ID;
    this.EdgeList = [];
}

function Edge() {
    var StartNodeID;
    var EndNodeID;
    var weight;
}

function PassedPath(ID) {
    this.curNodeID = ID;
    this.weight = Infinity;
    this.passedIDList = [];
    this.BeProcessed = false;
}

function RoutePlanResult(strings, d) {
    this.passedNodeIDs = strings;
    this.weight = d;
}

RoutePlanResult.prototype = {
    getPassedNodeIDs: function () {
        return this.passedNodeIDs;
    },

    setPassedNodeIDs: function (passedNodeIDs) {
        this.passedNodeIDs = passedNodeIDs;
    },

    getWeight: function () {
        return weight;
    },

    setWeight: function (weight) {
        this.weight = weight;
    }
}

function PlanCourse(nodeList, originID) {
    this.htPassedPath = {};
    var originNode = null;
    for (var key in nodeList) {
        var node = nodeList[key];
        if (node.ID == originID) {
            originNode = node;
        }
        else {
            var pPath = new PassedPath(node.ID);
            this.htPassedPath[node.ID] = pPath;
        }
    }
    if (originNode == null) {
        alert("Null Node!");
    }

    this.InitializeWeight(originNode);
}

PlanCourse.prototype = {
    InitializeWeight: function (originNode) {
        if ((originNode.EdgeList == undefined) || (originNode.EdgeList.Count == 0)) {
            return;
        }

        for (var key in originNode.EdgeList) {
            var edge = originNode.EdgeList[key];
            var pPath = this.htPassedPath[edge.EndNodeID];
            if (pPath == null) {
                continue;
            }
            pPath.passedIDList.push(originNode.ID);
            pPath.weight = edge.weight;
        }
    }
}

function RoutePlanner() { }
RoutePlanner.prototype = {
    InitPaths: function (array) {
        var nodeList = [];
        for (var i = 0; i < array.length; i++)
            for (var j = 0; j < array.length; j++) {
                if (array[i][j].v == 1) {
                    var id = i.toString() + j.toString();
                    var node = new Node(id);
                    nodeList.push(node);

                    if (i - 1 >= 0) {
                        if (array[i - 1][j].v == 1) {
                            var left = new Edge();
                            left.StartNodeID = id;
                            //left.EndNodeID = (i - 1).toString() + j.toString();
                            left.EndNodeID = Cord.toPos(i - 1, j);
                            left.weight = 1;
                            node.EdgeList.push(left);
                        }
                    }

                    if (i + 1 < array.length) {
                        if (array[i + 1][j].v == 1) {
                            var right = new Edge();
                            right.StartNodeID = id;
                            //right.EndNodeID = (i + 1).toString() + j.toString();
                            right.EndNodeID = Cord.toPos(i + 1, j);
                            right.weight = 1;
                            node.EdgeList.push(right);
                        }
                    }

                    if (j - 1 >= 0) {
                        if (array[i][j - 1].v == 1) {
                            var top = new Edge();
                            top.StartNodeID = id;
                            //top.EndNodeID = i.toString() + (j - 1).toString();
                            top.EndNodeID = Cord.toPos(i, j - 1);
                            top.weight = 1;
                            node.EdgeList.push(top);
                        }
                    }
                    if (j + 1 < array.length) {
                        if (array[i][j + 1].v == 1) {
                            var bottom = new Edge();
                            bottom.StartNodeID = id;
                            //bottom.EndNodeID = i.toString() + (j + 1).toString();
                            bottom.EndNodeID = Cord.toPos(i, j + 1);
                            bottom.weight = 1;
                            node.EdgeList.push(bottom);
                        }
                    }
                }
            }
        return nodeList;
    },

    //Return the shortest path
    Plan: function (nodeList, originID, destID) {
        var planCourse = new PlanCourse(nodeList, originID);
        var curNode = this.GetMinWeightRudeNode(planCourse, nodeList, originID);

        while (curNode != null) {
            var curPath = planCourse.htPassedPath[curNode.ID];
            for (var key in curNode.EdgeList) {
                var edge = curNode.EdgeList[key];
                if (edge.EndNodeID != originID) {
                    var targetPath = planCourse.htPassedPath[edge.EndNodeID];
                    var tempWeight = curPath.weight + edge.weight;

                    if (tempWeight < targetPath.weight) {
                        targetPath.weight = tempWeight;
                        targetPath.passedIDList = [];

                        for (var i = 0; i < curPath.passedIDList.length; i++) {
                            targetPath.passedIDList.push(curPath.passedIDList[i].toString());
                        }
                        targetPath.passedIDList.push(curNode.ID);
                    }
                }
            }
            //Flag it to be processed
            planCourse.htPassedPath[curNode.ID].BeProcessed = true;
            //Get the next un-processed node
            curNode = this.GetMinWeightRudeNode(planCourse, nodeList, originID);
        }

        //Planning process finished
        return this.GetResult(planCourse, destID);
    },

    //Get Processed Path from PlanCourse

    GetResult: function (planCourse, destID) {
        var pPath = planCourse.htPassedPath[destID];
        if (pPath == undefined) {
            var result1 = new RoutePlanResult(null, Infinity);
            return result1;
        }
        if (pPath.weight == Infinity) {
            var result1 = new RoutePlanResult(null, Infinity);
            return result1;
        }

        var passedNodeIDs = new Array(pPath.passedIDList.length);

        for (var i = 0; i < passedNodeIDs.length; i++) {
            passedNodeIDs[i] = pPath.passedIDList[i].toString();
        }
        //Remove the startpoint and add the endpoint
        for (var i = 0; i < passedNodeIDs.length - 1; i++) {
            passedNodeIDs[i] = pPath.passedIDList[i + 1].toString();
        }
        passedNodeIDs[passedNodeIDs.length - 2] = pPath.passedIDList[passedNodeIDs.length - 1].toString();
        passedNodeIDs[passedNodeIDs.length - 1] = destID;
        //
        var result = new RoutePlanResult(passedNodeIDs, pPath.weight);
        return result;
    },


    GetMinWeightRudeNode: function (planCourse, nodeList, originID) {
        var weight = Infinity;
        var destNode = null;

        for (var key in nodeList) {
            var node = nodeList[key];
            if (node.ID == originID) {
                continue;
            }

            var pPath = planCourse.htPassedPath[node.ID];
            if (pPath.BeProcessed) {
                continue;
            }

            if (pPath.weight < weight) {
                weight = pPath.weight;
                destNode = node;
            }
        }
        return destNode;
    }
}

Element.prototype.move = function (path, i, callback) {
    if ($(this).hasClass("ball")) {
        var self = this;
        var radius = self.clientHeight + 1;
        var topCorner = $(this).position().top % radius;
        var leftCorner = $(this).position().left % radius;

        $(this).removeClass("selected");
        if (i < path.passedNodeIDs.length) {
            var pos = path.passedNodeIDs[i];
            var row = Cord.getRow(pos);
            var col = Cord.getCol(pos);

            var curLeft = $(this).position().left;
            var curTop = $(this).position().top;
            $(self).animate({ top: topCorner + row * radius, left: leftCorner + col * radius }, 200,
                    function () {
                        i++;
                        if (i < path.passedNodeIDs.length) {
                            this.move(path, i);
                        }
                    });
        }
        else {
//            $(self).queue(function (callback) {
//                alert("Moved");
//                //callback();

//            });
        }
    }
}



function disappear(ball, row, col, color) {
    ballselected = false;
    $(ball).attr("pos", Cord.toPos(row, col, color));
    array.Set(row, col, color);
    var lineCheck = new LineCheck(array.matrix, row, col, color);
    var result = lineCheck.getResult();
    if (result.length > 0) {
        array.Clear(result);

        for (var key in result) {
            $("div.ball[pos='" + result[key] + "']").queue("fx").fadeOut(1000, function () {
                $(this).remove();
            });
        }
    }
}

function test() {
    alert("Test!");
}

function msgbag(i, ball, row, col, color) {
    this.i = i;
    this.ball = ball;
    this.row = row;

}

function nextMoveHandler(e) {
    if (e.message == "finished") {

    }
    else {


    }
}
function calc_step(current, sign_check, sign_init, c, step, step_sign, elem) {
    if (current >= 22 && current <= 99 && current % 10 != 0 && current % 10 != 1) {
        if (document.getElementById(current - 11).innerHTML == sign_check || document.getElementById(current - 10).innerHTML == sign_check || document.getElementById(current - 9).innerHTML == sign_check ||
            document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(Number(current) + 11).innerHTML == sign_check || document.getElementById(Number(current) + 10).innerHTML == sign_check ||
            document.getElementById(Number(current) + 9).innerHTML == sign_check || document.getElementById(Number(current) + 1).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current >= 12 && current <= 19) {
        if (document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(Number(current) + 11).innerHTML == sign_check ||
            document.getElementById(Number(current) + 10).innerHTML == sign_check || document.getElementById(Number(current) + 9).innerHTML == sign_check || document.getElementById(Number(current) + 1).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current >= 102 && current <= 109) {
        if (document.getElementById(current - 11).innerHTML == sign_check || document.getElementById(current - 10).innerHTML == sign_check ||
            document.getElementById(current - 9).innerHTML == sign_check || document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(Number(current) + 1).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current >= 21 && current <= 91 && current % 10 == 1) {
        if (document.getElementById(current - 10).innerHTML == sign_check || document.getElementById(current - 9).innerHTML == sign_check ||
            document.getElementById(Number(current) + 11).innerHTML == sign_check || document.getElementById(Number(current) + 10).innerHTML == sign_check ||
            document.getElementById(Number(current) + 1).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current >= 30 && current <= 100 && current % 10 == 0) {
        if (document.getElementById(current - 11).innerHTML == sign_check || document.getElementById(current - 10).innerHTML == sign_check ||
            document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(Number(current) + 10).innerHTML == sign_check ||
            document.getElementById(Number(current) + 9).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current == 11) {
        if (document.getElementById(Number(current) + 1).innerHTML == sign_check || document.getElementById(Number(current) + 10).innerHTML == sign_check ||
            document.getElementById(Number(current) + 11).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if (current == 110) {
        if (document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(current - 10).innerHTML == sign_check ||
            document.getElementById(current - 11).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if(current == 101) {
        if(document.getElementById(current - 10).innerHTML == sign_check || document.getElementById(current - 9).innerHTML == sign_check ||
           document.getElementById(Number(current) + 1).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
    if(current == 20) {
        if(document.getElementById(current - 1).innerHTML == sign_check || document.getElementById(Number(current) + 9).innerHTML == sign_check ||
        document.getElementById(Number(current) + 10).innerHTML == sign_check) {
            step[c.value] = elem.id
            step_sign[c.value] = sign_init
            c.value++
            return
        }
    }
}
function get_colony_left(sign) {
    let count = 0
    for (let i = 110; i > 10; i--) {
        if (document.getElementById(i).innerHTML == sign) {
            count++
        }
    }
    return count
}

var first_O = false
var but_click = false
var sign = "X"
var flag
var step = []

document.getElementById("step_left").innerHTML = "Осталось ходов: "
document.getElementById("cur_step").innerHTML = "Ходит:(X)"

const send = async(sign) => {
    let user = {
        final:sign
    };
      
    let response = await fetch('/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
}
var c = {value: 0}
var first_X = true
var step_sign = []
var socket = io.connect();
socket.on('add mass', function (data) {
    if (data.c_value == 3) {
        step = []
        step_sign = []
        c.value = 0
        if (data.cur_sign == "O") {
            sign = "X"
        } else {
            sign = "O"
        }
    }
    document.getElementById("cur_step").innerHTML = "Ходит: (" + sign + ")"
    if(!data.b_click) {
        document.getElementById(data.mass1).innerHTML = data.mass2
        document.getElementById("step_left").innerHTML = "Осталось ходов: " + (3 - c.value)
        document.getElementById("colony_left_X").innerHTML = "Живых колоний (X): " + get_colony_left("X")
        document.getElementById("colony_left_O").innerHTML = "Живых колоний (O): " + get_colony_left("O")
        first_X = data.f_X
        first_O = data.f_O
        flag = true
        if ((!get_colony_left("X") || !get_colony_left("O")) && !first_X && !first_O) {
            if(get_colony_left("X")) {
                alert("Игра завершена! Победил игрок, играющий за крестики")
                sign = "X"
            } else {
                alert("Игра завершена! Победил игрок, играющий за нолики")
                sign = "O"
            }
            send(sign)
        }
    }
})

let clicktable = document.querySelectorAll(".cell").forEach((elem) => {
    elem.addEventListener("click", (e) => {
            if ((first_X && elem.id == 101 || first_O && elem.id == 20) && c.value == 0) {
                step[c.value] = elem.id
                step_sign[c.value] = sign
                c.value++
                first_O = true
                if(!first_X) {
                    first_O = false
                }
                first_X = false
            }
            var current = elem.id
            if (elem.innerHTML == "_") {
                calc_step(current, sign, sign, c, step, step_sign, elem)
            } else if (elem.innerHTML != sign && elem.innerHTML != "⊗" && elem.innerHTML != "Ø") {
                var sign_die
                var notsign
                if (sign == "O") {
                    sign_die = "⊗"
                    notsign = "X"
                } else {
                    sign_die = "⚫"
                    notsign = "O"
                }
                var tmp = c.value
                calc_step(current, sign, sign_die, c, step, step_sign, elem)
                if(tmp == c.value) {
                    calc_step(current, sign_die, sign_die, c, step, step_sign, elem)
                }
            }
            but_click = false
            socket.emit('send mass', {
                mass1: step[c.value - 1], 
                mass2: step_sign[c.value - 1], 
                c_value: c.value,
                cur_sign: sign,
                f_X: first_X,
                f_O: first_O,
                b_click: but_click
            });
        }
    )
})
document.querySelector("#skip_step").onclick = function() {
    if(c.value == 0) {
        c.value = 3
        but_click = true
        socket.emit('send mass', {
            mass1: step[c.value - 1], 
            mass2: step_sign[c.value - 1], 
            c_value: c.value,
            cur_sign: sign,
            f_X: first_X,
            f_O: first_O,
            b_click: but_click
        });
    }
}


let unusedCommands = game.getCommandPalette(); // Получить список доступных команд на текущем уровне (использованные команды должны пропадать из списка)

for (const command of unusedCommands) {
    let icon = getIcon(command.type);

    if (command.type === 'move') {
        let actions = command.actions;

        for (const step of actions) {
            renderStep(step.direction);
        }
    }

    if (command.type === 'attack') {
        renderAttack(command.damage, command.direction);
    }
}



let usedCommands = game.getUsedCommands(); // Получить список команд, которые уже использованы

for (const command of usedCommands) {
    let icon = getIcon(command.type);

    if (command.type === 'move') {
        let actions = command.actions;

        for (const step of actions) {
            renderStep(step.direction);
        }
    }

    if (command.type === 'attack') {
        renderAttack(command.damage, command.direction);
    }
}



let command = null; // Команда, которую взял мышкой

game.addCommand(command); // Добавляет команду в список использованных и удаляет из доступных
game.addCommand(command, index); // Добавляет команду в список на определенную позицию использованных и удаляет из доступных

game.removeCommand(command); // Удаляет команду из списка использованных и возвращает в доступные
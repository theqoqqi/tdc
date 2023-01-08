game.play() // Начать выполнять команды с разрывом в половину секунды
game.stop() // Остановить выполнение команд и вернуть все объекты на место
game.isPlaying // Запущено ли сейчас выполнение команд
// public static bool IsEqualInARow(Mark[,] field, Mark mark, int x, int y, int dx, int dy)
// {
//     for (int i = 0; i < field.GetLength(0); i++)
//     {
//         if (field[x,y] != mark)
//         {
//             return false;
//         }
//         x += dx;
//         y += dy;
//     }
//
//     return true;
// }
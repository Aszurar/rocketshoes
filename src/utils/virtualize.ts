import { COLUMNS_COUNT, WINDOW_SIZES } from './enums'

/**
 * Calcula o número de colunas com base na largura do container.
 *
 * Esta função determina o número apropriado de colunas para um layout responsivo
 * baseado em breakpoints predefinidos nos enums WINDOW_SIZES e COLUMNS_COUNT.
 *
 * @param {number} containerWidth - A largura do container em pixels
 * @returns {number} O número de colunas a serem exibidas
 *
 * @example
 * // Para um container com largura de 1200px
 * const columns = calculateColumnCount(1200);
 * // Se WINDOW_SIZES.lg = 1024, retornará COLUMNS_COUNT.lg (provavelmente 4)
 *
 * @example
 * // Para um container com largura de 700px
 * const columns = calculateColumnCount(700);
 * // Se WINDOW_SIZES.md = 768 e WINDOW_SIZES.sm = 640,
 * // retornará COLUMNS_COUNT.sm (provavelmente 2)
 */
function calculateColumnCount(containerWidth: number) {
  if (containerWidth >= WINDOW_SIZES.lg) {
    return COLUMNS_COUNT.lg
  }
  if (containerWidth >= WINDOW_SIZES.md) {
    return COLUMNS_COUNT.md
  }
  if (containerWidth >= WINDOW_SIZES.sm) {
    return COLUMNS_COUNT.sm
  }

  return COLUMNS_COUNT.xs
}

export { calculateColumnCount }

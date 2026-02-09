import { pool } from '../conexion-mysql';
import { Reserva } from '../../Domain/Entidades/reserva';

export class ReservaRepositorioMySQL {

    async guardar(reserva: Reserva): Promise<void> {
        const sql = `
            INSERT INTO reservas (cliente_id, fecha_inicio, fecha_fin, total)
            VALUES (?, ?, ?, ?)
        `;

        await pool.execute(sql, [
            reserva.cliente_id,
            reserva.fecha_inicio,
            reserva.fecha_fin,
            reserva.total
        ]);
    }
}

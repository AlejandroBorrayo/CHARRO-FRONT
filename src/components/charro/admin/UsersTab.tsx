"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { isAxiosError } from "@/lib/apiClient";
import { findAllUsers } from "@/services/user";
import { formatFullName, formatRole } from "@/lib/userFormatters";
import { CharroFormMessage } from "@/components/charro/CharroFormMessage";
import { UserDetailModal } from "@/components/charro/admin/UserDetailModal";
import type { UserCollectionInterface } from "@/type/user.interface";

const PER_PAGE = 10;

export function UsersTab() {
  const { data: session } = useSession();
  const userId = session?.user?.sub;

  const [users, setUsers] = useState<UserCollectionInterface[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserCollectionInterface | null>(null);

  const loadUsers = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError("");

    try {
      const result = await findAllUsers(
        userId,
        { page, perpage: PER_PAGE },
        search
      );
      setUsers(result.records ?? []);
      setTotalPages(result.totalpages ?? 1);
      setTotal(result.total ?? 0);
    } catch (err) {
      const message = isAxiosError(err)
        ? (err.response?.data as { message?: string })?.message
        : undefined;
      setError(message ?? "No se pudieron cargar los usuarios.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [userId, page, search]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div className="charro-admin__section">
      <div className="charro-admin__section-header">
        <div>
          <h3 className="charro-admin__section-title">Usuarios registrados</h3>
          <p className="charro-admin__section-subtitle">
            {total > 0
              ? `${total} usuario${total === 1 ? "" : "s"} en total`
              : "Listado de miembros de la comunidad"}
          </p>
        </div>
        <form className="charro-admin__search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre o email…"
            className="charro-auth__input"
            aria-label="Buscar usuarios"
          />
          <button type="submit" className="btn-charro-outline">
            Buscar
          </button>
        </form>
      </div>

      {error && <CharroFormMessage variant="error">{error}</CharroFormMessage>}

      <div className="charro-admin__table-wrap">
        <table className="charro-admin__table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="charro-admin__empty">
                  Cargando usuarios…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="charro-admin__empty">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{formatFullName(user)}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="charro-admin__badge">{formatRole(user.role)}</span>
                  </td>
                  <td className="charro-admin__actions">
                    <button
                      type="button"
                      className="btn-charro-outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="charro-admin__pagination">
          <button
            type="button"
            className="btn-charro-outline"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>
          <span className="charro-admin__pagination-info">
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            className="btn-charro-outline"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      )}

      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

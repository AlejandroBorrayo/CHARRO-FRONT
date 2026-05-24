"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { isAxiosError } from "@/lib/apiClient";
import { getApiErrorMessage } from "@/services/auth";
import { sendNotification } from "@/services/notification";
import { findAllUsers } from "@/services/user";
import { formatFullName } from "@/lib/userFormatters";
import { CharroField } from "@/components/charro/CharroField";
import { CharroFormMessage } from "@/components/charro/CharroFormMessage";
import type { UserCollectionInterface } from "@/type/user.interface";

const USERS_PER_PAGE = 20;

export function NotificationsTab() {
  const { data: session } = useSession();
  const userId = session?.user?.sub;

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [users, setUsers] = useState<UserCollectionInterface[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async () => {
    if (!userId) return;

    setLoadingUsers(true);
    setError("");

    try {
      const result = await findAllUsers(
        userId,
        { page: userPage, perpage: USERS_PER_PAGE },
        userSearch
      );
      setUsers(result.records ?? []);
      setUserTotalPages(result.totalpages ?? 1);
    } catch (err) {
      setError(
        isAxiosError(err)
          ? (err.response?.data as { message?: string })?.message ??
              "No se pudieron cargar los usuarios."
          : "No se pudieron cargar los usuarios."
      );
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }, [userId, userPage, userSearch]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  function applyUserSearch() {
    setUserPage(1);
    setUserSearch(userSearchInput.trim());
  }

  function toggleUser(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllOnPage() {
    const pageIds = users
      .map((u) => u._id)
      .filter((id): id is string => Boolean(id));

    const allSelected = pageIds.every((id) => selectedIds.has(id));

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) {
      setError("Sesión no válida.");
      return;
    }

    if (!title.trim() || !subject.trim() || !description.trim()) {
      setError("Título, asunto y descripción son obligatorios.");
      return;
    }

    if (selectedIds.size === 0) {
      setError("Selecciona al menos un destinatario.");
      return;
    }

    setSending(true);

    try {
      await sendNotification({
        userid: userId,
        title: title.trim(),
        subject: subject.trim(),
        description: description.trim(),
        user_ids: Array.from(selectedIds),
      });

      setSuccess(`Aviso enviado a ${selectedIds.size} usuario(s).`);
      setTitle("");
      setSubject("");
      setDescription("");
      setSelectedIds(new Set());
    } catch (err) {
      setError(getApiErrorMessage(err, "No se pudo enviar la notificación."));
    } finally {
      setSending(false);
    }
  }

  const pageIds = users
    .map((u) => u._id)
    .filter((id): id is string => Boolean(id));
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

  return (
    <div className="charro-admin__section">
      <div>
        <h3 className="charro-admin__section-title">Enviar notificación</h3>
        <p className="charro-admin__section-subtitle">
          Redacta un aviso y selecciona los usuarios que lo recibirán por correo.
        </p>
      </div>

      <form className="charro-auth__form charro-admin__notification-form" onSubmit={handleSubmit}>
        <CharroField
          label="Título"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ej. Aviso importante"
        />

        <CharroField
          label="Asunto"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="Asunto del correo"
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="notification-description" className="charro-auth__label">
            Descripción
          </label>
          <textarea
            id="notification-description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="Contenido del aviso…"
            className="charro-auth__input resize-y"
          />
        </div>

        <div className="charro-admin__recipients">
          <div className="charro-admin__recipients-header">
            <div>
              <p className="charro-auth__label">Destinatarios</p>
              <p className="charro-admin__section-subtitle">
                {selectedIds.size} seleccionado{selectedIds.size === 1 ? "" : "s"}
              </p>
            </div>
            <div className="charro-admin__search">
              <input
                type="search"
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyUserSearch();
                  }
                }}
                placeholder="Buscar usuario…"
                className="charro-auth__input"
                aria-label="Buscar destinatarios"
              />
              <button
                type="button"
                className="btn-charro-outline"
                onClick={applyUserSearch}
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="charro-admin__recipients-toolbar">
            <label className="charro-admin__checkbox-label">
              <input
                type="checkbox"
                checked={allPageSelected}
                onChange={toggleAllOnPage}
                disabled={loadingUsers || users.length === 0}
              />
              Seleccionar todos en esta página
            </label>
          </div>

          <div className="charro-admin__recipients-list">
            {loadingUsers ? (
              <p className="charro-admin__empty">Cargando usuarios…</p>
            ) : users.length === 0 ? (
              <p className="charro-admin__empty">No se encontraron usuarios.</p>
            ) : (
              users.map((user) => {
                const id = user._id;
                if (!id) return null;

                return (
                  <label key={id} className="charro-admin__recipient-item">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(id)}
                      onChange={() => toggleUser(id)}
                    />
                    <span>
                      <strong>{formatFullName(user)}</strong>
                      <span className="charro-admin__recipient-email">{user.email}</span>
                    </span>
                  </label>
                );
              })
            )}
          </div>

          {userTotalPages > 1 && (
            <div className="charro-admin__pagination">
              <button
                type="button"
                className="btn-charro-outline"
                disabled={userPage <= 1 || loadingUsers}
                onClick={() => setUserPage((p) => p - 1)}
              >
                Anterior
              </button>
              <span className="charro-admin__pagination-info">
                Página {userPage} de {userTotalPages}
              </span>
              <button
                type="button"
                className="btn-charro-outline"
                disabled={userPage >= userTotalPages || loadingUsers}
                onClick={() => setUserPage((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        {error && <CharroFormMessage variant="error">{error}</CharroFormMessage>}
        {success && <CharroFormMessage variant="success">{success}</CharroFormMessage>}

        <button type="submit" disabled={sending} className="btn-charro">
          {sending ? "Enviando…" : "Enviar notificación"}
        </button>
      </form>
    </div>
  );
}

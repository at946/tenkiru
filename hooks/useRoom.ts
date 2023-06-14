import { useMemo } from 'react';

// store
import { useAppSelector } from '@/store/hooks';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// interfaces
import { IFRoom, IFTable, IFTableCard } from '@/store/roomSlice';

const useRoom = (): Room => {
  const roomState: IFRoom = useAppSelector((state) => state.room.room);

  const instantiatedRoom = useMemo(() => {
    if (!roomState) return null;

    const tableState: IFTable = roomState.table;
    const table: Table = new Table([], tableState.cardsAreOpen);

    const tableCardsState: IFTableCard[] = tableState.cards;
    tableCardsState.forEach((tableCard: IFTableCard) => {
      table.addCard(new TableCard(tableCard.playerId, tableCard.value));
    });

    const room: Room = new Room(roomState.id, table, roomState.deckType);

    return room;
  }, [roomState]);
  return instantiatedRoom;
};

export default useRoom;

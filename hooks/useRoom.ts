import { useMemo } from 'react';

// store
import { useAppSelector } from '@/store/hooks';

// class
import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { TableCard } from '@/class/tableCard';

// interfaces
import { IFRoom, IFTableCard } from '@/store/roomSlice';

const useRoom = (): Room => {
  const roomState: IFRoom = useAppSelector((state) => state.room.room);

  const instantiatedRoom = useMemo(() => {
    if (!roomState) return null;

    const table: Table = new Table();
    roomState.table.cards.forEach((tableCard: IFTableCard) => {
      table.addCard(new TableCard(tableCard.playerId, tableCard.value));
    });
    const room: Room = new Room(roomState.id, table, roomState.deckType);
    return room;
  }, [roomState]);
  return instantiatedRoom;
};

export default useRoom;

import { Room } from '@/class/room';
import { Table } from '@/class/table';
import { Card } from '@/class/card';
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';

const useRoom = (): Room => {
  const room = useAppSelector((state) => state.room.room);
  const instantiatedRoom = useMemo(() => {
    const cards: Card[] = room.table.cards.map((card: Card) => new Card(card.playerId, card.value));
    const table: Table = new Table(cards, room.table.isOpenCards);
    return new Room(room.id, table, room.deckType);
  }, [room]);
  return instantiatedRoom;
};

export default useRoom;

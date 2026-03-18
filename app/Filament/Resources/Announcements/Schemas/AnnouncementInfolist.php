<?php

namespace App\Filament\Resources\Announcements\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class AnnouncementInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('message')
                    ->columnSpanFull(),
                TextEntry::make('target_audience')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('publish_date')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('expiry_date')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}

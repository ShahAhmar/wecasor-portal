<?php

namespace App\Filament\Resources\DataSubmissions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class DataSubmissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('study_id')
                    ->relationship('study', 'title')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\Select::make('institution_id')
                    ->relationship('institution', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->label('Submitted By')
                    ->searchable()
                    ->preload()
                    ->required(),
                \Filament\Forms\Components\KeyValue::make('data_payload')
                    ->label('Patient Record Data'),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Pending' => 'Pending Review',
                        'Approved' => 'Approved',
                        'Rejected' => 'Rejected',
                        'Revision Requested' => 'Revision Requested',
                    ])
                    ->default('Pending')
                    ->required(),
                Textarea::make('comments')
                    ->columnSpanFull(),
            ]);
    }
}
